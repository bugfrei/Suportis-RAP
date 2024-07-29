// Tools for the project
import clipboardy from 'clipboardy';
import inout from './inout.js';
const tools = {
 reviver: function(key, value) {
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value)) {
            return new Date(value);
        }
        return value;
    },
    padToTwoDigits: function(num) {
        return num.toString().padStart(2, '0');
    },
    formatDateToYYMMDD: function(date) {
        const day = this.padToTwoDigits(date.getDate());
        const month = this.padToTwoDigits(date.getMonth() + 1); // Monate sind 0-basiert
        const year = date.getFullYear().toString();

        return `${year}${month}${day}`;
    },
    setClipboard: function(text) {
        clipboardy.writeSync(text);
    },
    getClipboard: function() {
        return clipboardy.readSync();
    },
    idType: function() {
        var uuidType = inout.read("UUID Type (16, 36, 32, 26, 22)", "16");
        if (uuidType == "16") {
            return "$uuid16";
        }
        else if (uuidType == "36") {
            return "$uuid36";
        }
        else if (uuidType == "32") {
            return "$uuid32";
        }
        else if (uuidType == "26") {
            return "$uuid26";
        }
        else if (uuidType == "22") {
            return "$uuid22";
        }
        else {
            return "";
        }
    }

}
export default tools;