// User Input, Output 
import promptobject from 'prompt-sync';
const inout = {
    prompt: promptobject(),
    red : '\x1b[31m',
    green : '\x1b[32m',
    yellow : '\x1b[33m',
    blue : '\x1b[34m',
    white : '\x1b[37m',
    gray : '\x1b[38;5;8m',
    reset : '\x1b[0m',

    read: function(text, def) {
        var p = `${this.green}${text}`;
        if (def) {
            p += ` ${this.gray}(${def})`;
        }
        p += `${this.reset} :`;
        var i = this.prompt(p, def, {});
        return i;
    },
    readRed: function(text, def) {
        var p = `${this.red}${text}`;
        if (def) {
            p += ` ${this.gray}(${def})`;
        }
        p += `${this.reset} :`;
        var i = this.prompt(p, def, {});
        return i;
    },
    readCondition: function(text, def, conditionFunction, error) {
        while(true) {
            var i = this.read(text, def);
            if (conditionFunction(i)) {
                return i;
            }
            else {
                console.log(`${this.red}${error}${this.reset}`);
            }
        }
    },
    readAsk: function(text, def = "") {
        var p = `${this.green}${text}`;
        if (def == "y" || def == "j") {
            p += ` ${this.gray}(Y/n)`;
        }
        else if (def == "n") {
            p += ` ${this.gray}(y/N)`;
        }
        else {
            p += ` ${this.gray}(y/n)`;
        }
        p += `${this.reset}: `;
        while(true) {
            var i = this.prompt(p, def, {}).toLowerCase();
            if (def == "y" || def == "j") {
                return i == "n" ? false : true;
            }
            else if (def == "n") {
                return (i == "y" || i == "j") ? true : false;
            }
            else {
                if (i == "y" || i == "j") {
                    return true;
                }
                else if(i == "n") {
                    return false;
                }   
                console.log(`${this.red}y or n require!${this.reset}`);
            }
        }
    }
}

export default inout;