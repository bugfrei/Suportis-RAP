import inout from './inout.js';
import tools from './tools.js';

const commands = {
    params: undefined,
    version: undefined,
    help: function() {
        console.log( 'USAGE:' );
        console.log( '    rap <command> [<args>]' );
        console.log( '' );
        console.log( '    d | datagen    Data-Generator Class from json' );
        console.log( '      | datagen?   Data-Generator: ChatGPT Anfrage erstellen' );
        console.log( '    m | metadata   Metadata Annotations for Fields' );
        console.log( '' );
        console.log( 'OPTIONS:' );
        console.log( '    -h, --help     output usage information' );
        console.log( '    -v, --version  output the version number' );
        console.log( '' );
        process.exit( 0 );
    },
    showversion: function() {
        console.log(`${inout.green}suportis_cs/rap: ${inout.reset + commands.version}`);
        console.log(`${inout.green}Node.js: ${inout.reset + process.version}`);
        process.exit(0);
    },
    datagenGPT: function() {
        var query = "";
        var anzahl = inout.read( "Anzahl von Einträge im JSON", "10" );

        query += `Erstelle mir ein JSON Array mit ${ anzahl } Einträgen, die folgende Felder haben:\n`;

        while ( true ) {
            console.log();
            var feldname = inout.read( "Feldname (Enter=fertig)", "" ).toLowerCase();
            if ( feldname == "" ) {
                break;
            }
            var feldtyp = "";
            var addinfo = "";
            var von = "";
            var bis = "";
            if ( feldname == "id" ) {
                if ( inout.readAsk( "UUID Feld?", "y" ) ) {
                    feldtyp = tools.idType();
                }
                else {
                    feldtyp = "";
                }
            }
            if ( feldtyp == "" ) {
                feldtyp = inout.read( "Feldtyp (UUID, Date, Boolean, Number, String)", "" ).toLowerCase();
                if ( feldtyp.startsWith( "u" ) ) {
                    feldtyp = idType();
                }
                else if ( feldtyp.startsWith( "d" ) ) {
                    addinfo = inout.read( "Zusätzliche Information zum Datum", "Geburtsdatum" );
                    feldtyp = "date";
                }
                else if ( feldtyp.startsWith( "b" ) ) {
                    feldtyp = "bool";
                }
                else if ( feldtyp.startsWith( "n" ) ) {
                    von = inout.read( "Von", "1" );
                    bis = inout.read( "Bis", "100" );
                    feldtyp = "number";
                }
                else if ( feldtyp.startsWith( "s" ) ) {
                    console.log( `${ inout.gray }Beim String wird ohne Angabe zusätzliche Informationen der Feldname als Inhaltsbeschreibung genommen${ inout.reset }` );
                    addinfo = inout.read( "Zusätzliche Information zum String (z.B. Vor- Nachname)", "" );
                    feldtyp = "string";
                }
            }

            if ( feldname != "" && feldtyp != "" ) {
                query += `${ feldname }: `;
                if ( feldtyp.startsWith( "$" ) ) {
                    query += `hat immer den String "${ feldtyp }" als Inhalt\n`;
                }
                else if ( feldtyp == "date" ) {
                    if ( addinfo.trim() == "" ) {
                        addinfo = "Datum";
                    }
                    query += `ist ein ${ addinfo } im JSON Datumsformat\n`;
                }
                else if ( feldtyp == "bool" ) {
                    query += `ist ein JSON Boolean\n`;
                }
                else if ( feldtyp == "number" ) {
                    if ( von != "" && bis != "" ) {
                        query += `ist ein JSON Number im Bereich ${ von } bis ${ bis }\n`;
                    }
                    else {
                        query += `ist ein JSON Number\n`;
                    }
                }
                else if ( feldtyp == "string" ) {
                    if ( addinfo != "" ) {
                        query += `ein JSON string mit ${ addinfo } als Inhalt\n`;
                    }
                    else {
                        query += `ist ein JSON String dessen Inhalt ${ feldname } wiederspiegelt\n`;
                    }
                }
            }
        }
        query += "\nAlle Daten sollen zufällig generiert werden.\n";

        tools.setClipboard( query );
        console.log( `${ inout.green }Anfrage in die Zwischenablage kopiert${ inout.reset }` );
        process.exit( 0 );
    },
    datagen: function() {
        commands.params.compare( 2, [ "--help", "-h" ], commands.datagenHelp );
        if ( commands.params.param2.startsWith( "z" ) ) {
            var tablename = commands.params.param2.toUpperCase();
            var classname = `ZCL_${ tablename }_DATA`;
        }
        else {
            var tablename = inout.readCondition( "Tabellenname (mit Prefix Z)", "", ( i ) => i.toUpperCase().startsWith( 'Z' ), "Tabellenname muss mit 'Z' beginnen" );
            var classname = inout.readCondition( "Klassenname (mit Prefix ZCL_)", `ZCL_${ tablename.toUpperCase() }_DATA`, ( i ) => i.toUpperCase().startsWith( 'ZCL_' ), "Klassenname muss mit 'ZCL_' beginnen" );
        }
        var deleteContent = inout.readAsk( "Inhalt der Tabelle löschen?", "y" );

        var existsDraft = inout.readAsk( "Existiert eine Draft-Tabelle?", "n" );
        if ( existsDraft ) {
            var draftTablename = inout.readCondition( "Draft-Tabellenname (mit Prefix Z)", `${ tablename }_D`, ( i ) => i.toUpperCase().startsWith( 'Z' ), "Tabellenname muss mit 'Z' beginnen" );
            var deleteDraftContent = inout.readAsk( "Inhalt der Draft-Tabelle löschen?", "y" );

        }
        else {
            var draftTablename = '';
            var deleteDraftContent = false;
        }

        var writeLog = inout.readAsk( "Log Zeile mit Anzahl Einträge ausgeben?", "y" );

        console.log();
        inout.readRed( "JSON Daten in die Zwischenablage kopieren und Enter drücken" );

        var json = tools.getClipboard();
        // json = '[ { "id": "$uuid16", "Birthday": "1990-05-22T00:00:00Z", "name": "Name", "active": true, "PIN": 1234 } ]';
        try {
            var dataObject = JSON.parse( json, tools.reviver );
        }
        catch ( e ) {
            console.log( `${ inout.red }Ungültiges JSON Format!${ inout.reset }` );
            process.exit( 1 );
        }

        var codePre = `CLASS ${ classname } DEFINITION\n`;
        codePre += `  PUBLIC\n`;
        codePre += `  FINAL\n`;
        codePre += `  CREATE PUBLIC .\n\n`;
        codePre += `  PUBLIC SECTION.\n\n`;
        codePre += `    INTERFACES if_oo_adt_classrun.\n`;
        codePre += `  PROTECTED SECTION.\n`;
        codePre += `  PRIVATE SECTION.\n`;
        codePre += `ENDCLASS.\n\n\n`;
        codePre += `CLASS ${ classname } IMPLEMENTATION.\n\n`;
        codePre += `  METHOD if_oo_adt_classrun~main.\n`;
        codePre += `    DATA itab TYPE TABLE OF ${ tablename.toLowerCase() }.\n\n`;
        codePre += `    DATA sum TYPE num10.\n`;
        codePre += `    sum = 0.\n\n`;

        var code = "";
        if ( deleteContent ) {
            codePre += `    DELETE FROM ${ tablename.toLowerCase() }.\n`;
        }
        if ( existsDraft && deleteDraftContent ) {
            codePre += `    DELETE FROM ${ draftTablename.toLowerCase() }.\n`;
        }
        
        let num = 0;

        for ( var row of dataObject ) {
            if (num == 0) {
                code += `    TRY.\n`
                code += `      CLEAR itab.\n`;
                code += `      itab = VALUE #(\n`;
            }
            code += `        (\n`;
            for ( var key in row ) {
                var value = row[ key ];
                var valueType = typeof ( value );
                if ( valueType == 'boolean' ) {
                    value = value ? 'abap_true' : 'abap_false';
                }
                else if ( valueType == 'object' ) {
                    if ( value instanceof Date ) {
                        value = `'${ tools.formatDateToYYMMDD( value ) }'`;
                    }
                }
                else if ( valueType == 'number' ) {
                    value = `'${value.toString()}'`;
                }
                else if ( valueType == 'string' ) {
                    if ( value.toLowerCase() == "abap_true" || value.toLowerCase() == "true" ) {
                        value = 'abap_true';
                    }
                    else if ( value.toLowerCase() == "abap_false" || value.toLowerCase() == "false" ) {
                        value = 'abap_false';
                    }
                    else if ( value.toLowerCase() == '$uuid16' ) {
                        value = "cl_system_uuid=>create_uuid_x16_static( )";
                    }
                    else if ( value.toLowerCase() == '$uuid36' ) {
                        value = "cl_system_uuid=>create_uuid_x36_static( )";
                    }
                    else if ( value.toLowerCase() == '$uuid32' ) {
                        value = "cl_system_uuid=>create_uuid_x32_static( )";
                    }
                    else if ( value.toLowerCase() == '$uuid26' ) {
                        value = "cl_system_uuid=>create_uuid_x26_static( )";
                    }
                    else if ( value.toLowerCase() == '$uuid22' ) {
                        value = "cl_system_uuid=>create_uuid_x22_static( )";
                    }
                    else if ( value.toLowerCase() == '$uuid16b' ) {
                        value = "cl_system_uuid=>create_uuid_x16_static( )->get_bytes( )";
                    }
                    else if ( value.toLowerCase() == '$uuid36b' ) {
                        value = "cl_system_uuid=>create_uuid_x36_static( )->get_bytes( )";
                    }
                    else if ( value.toLowerCase() == '$uuid32b' ) {
                        value = "cl_system_uuid=>create_uuid_x32_static( )->get_bytes( )";
                    }
                    else if ( value.toLowerCase() == '$uuid26b' ) {
                        value = "cl_system_uuid=>create_uuid_x26_static( )->get_bytes( )";
                    }
                    else if ( value.toLowerCase() == '$uuid22b' ) {
                        value = "cl_system_uuid=>create_uuid_x22_static( )->get_bytes( )";
                    }
                    else {
                        value = `'${ value }'`;
                    }
                }
                code += `          ${ key.toLowerCase() } = ${ value }\n`;
            }
            code += `        )\n`;
            if (num == 39) {
                num = 0;
                code += `      ).\n`;
                code += `    CATCH cx_root.\n`;
                code += `    ENDTRY.\n\n`;
                code += `    INSERT ${ tablename.toLowerCase() } FROM TABLE itab.\n\n`;
                if (writeLog) {
                    code += `    sum = sum + sy-dbcnt.\n`;
                    code += `    out->write( |{ sy-dbcnt } entries inserted successfully| ).\n`;
                }
            }
            else {
                num++;
            }
        }
        if (num > 0) {
            code += `      ).\n`;
            code += `    CATCH cx_root.\n`;
            code += `    ENDTRY.\n\n`;
            code += `    INSERT ${ tablename.toLowerCase() } FROM TABLE itab.\n\n`;
            if (writeLog) {
                code += `    sum = sum + sy-dbcnt.\n`;
                code += `    out->write( |{ sy-dbcnt } entries inserted successfully| ).\n`;
            }
        }
        
        let codeSuf = "";


        if ( writeLog ) {
            codeSuf += `    out->write( |{ sum } entries inserted totaly| ).\n`;
        }
        codeSuf += "\n";
        codeSuf += `  ENDMETHOD.\n`;
        codeSuf += `ENDCLASS.`;

        var finalCode = codePre + code + codeSuf;
        tools.setClipboard( finalCode );
        console.log( `${ inout.green }Code in die Zwischenablage kopiert${ inout.reset }` );
        console.log( `Klasse ${ inout.green + classname + inout.reset } erstellen und Code aus der Zwischenablage einfügen.`);
        process.exit( 0 );
    },
    datagenHelp: function() {
        console.log( 'USAGE:' );
        console.log( '    rap d [Z<tablename>]' );
        console.log( '' );
        console.log( 'OPTIONS:' );
        console.log( '    -h, --help     output usage information' );
        console.log( '' );
        console.log( "JSON Formate (JSON ist immer ein Array):" );
        console.log( "  - UUID: '\$uuid16', '\$uuid36', '\$uuid32', '\$uuid26', '\$uuid22'" );
        console.log( "  - UUID Bytes: '\$uuid16b', '\$uuid36b', '\$uuid32b', '\$uuid26b', '\$uuid22b'" );
        console.log( "  - Datum: '2021-12-31T00:00:00Z', '20211231' (ABAP Format)" );
        console.log( "  - Boolesch: true, false, 'abap_true', 'abap_false'" );
        console.log( "  - Zahlen: 123, 123.45" );
        console.log( "  - Text: 'Text'" );
        console.log( "\nZum Beispiel:" );
        console.log( "[  {\n    \"id\": \"\$uuid16\",\n    \"Birthday\": \"1990-05-22T00:00:00Z\",\n    \"name\": \"Name\",\n    \"active\": true,\n    \"PIN\": 1234\n}  ]\n" );
        commands.params.see( commands.params.list.datagenGPT );

        process.exit( 0 );
    }
};
export default commands;