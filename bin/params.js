// Parameterhandling
import inout from './inout.js';
const params = {
    VERSION : '0.0.1',
    init: function( paramsArray ) {
        for ( let i = 0; i < 10; i++ ) {
            if ( paramsArray[ i ] ) {
                this[ `param${ i + 1 }` ] = paramsArray[ i ].toLowerCase();
                this[ `orig${ i + 1 }` ] = paramsArray[ i ];
            } else {
                this[ `param${ i + 1 }` ] = "";
                this[ `orig${ i + 1 }` ] = "";
            }
        }
    },
    compare( param, values, matchfunction ) {
        if ( matchfunction ) {
            if ( values.some( ( e ) => e.toLowerCase() == this[ `param${ param }` ] ) ) {
                matchfunction();
            }
        }
        else {
            return values.some( ( e ) => e.toLowerCase() == this[ `param${ param }` ] );
        }
    },
    list: {
        help: { paramlist: [ '--help', '-h', '-?' ], description: "Help" },
        version: { paramlist: [ '--version', '-v' ], description: "Version" },
        datagenGPT: { paramlist: [ 'datagen?', "?" ], description: "Chat GPT query generator for Data Generation" },
        datagen: { paramlist: [ 'datagen', 'd' ], description: "Data Generation" },
    },
    see: function(parameters) {
        console.log("SEE ALSO:");
        if (Array.isArray(parameters)) {
            for(var param of parameters) {
                if (typeof(param) == "string") {
                    param = params.list[param];
                }
                console.log(`${param.description}:`);
                for(var p of param.paramlist) {
                    console.log(`  ${inout.green}rap ${p + inout.reset}`);
                }
            }
        }
        else {
            if (typeof(parameters) == "string") {
                parameters = params.list[parameters];
            }
            console.log(`${parameters.description}:`);
            for(var p of parameters.paramlist) {
                console.log(`  ${inout.green}rap ${p + inout.reset}`);
            }
        }
    }
};
export default params;
