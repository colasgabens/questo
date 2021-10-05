"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const events_1 = __importDefault(require("events"));
let Data_Buffer = "";
let notilus = 0;
let Answers = [];
class questo {
    constructor(parameter) {
        this.array = parameter.array;
        this.array_length = parameter.array.length;
        this.array_index = parameter.array.length - 1;
        this.stdin = parameter.stdin;
        this.stdout = parameter.stdout;
        this.emitter = new events_1.default();
        this.stop = false;
    }
    hideCursor() {
        this.stdout.write("\x1B[?25l");
    }
    showCursor() {
        this.stdout.write("\x1B[?25h");
    }
    End() {
        return this.emitter;
    }
    enter() {
        if (this.array_index !== notilus) {
            if (this.array[notilus].Check(Data_Buffer)) {
                this.stdin.removeListener('data', this.pn);
                this.stdin.setRawMode(false);
                console.log(`\nthat was your input : ${Data_Buffer}`);
                Answers.push(this.array[notilus].Check(Data_Buffer));
                notilus++;
                Data_Buffer = "";
                this.controller(true);
            }
            else {
                this.stdin.removeListener('data', this.pn);
                this.stdin.setRawMode(false);
                console.log(`\nthat was your input : ${Data_Buffer}`);
                console.log(this.Color(this.array[notilus].Error_Question, "red"));
                Data_Buffer = "";
                this.controller(false);
            }
        }
        else {
            if (!this.stop) {
                Answers.push(this.array[notilus].Check(Data_Buffer));
                console.log(Answers);
                this.stop = true;
                console.log("\nthanks !");
                this.emitter.emit("end", Answers);
                this.stdin.removeListener('data', this.pn);
                this.stdin.setRawMode(false);
                //uncomment the next line if you want the code to stop after that
                // this.stdin.pause()
                this.showCursor();
            }
        }
    }
    ctrlc() {
        this.stdin.removeListener('data', this.pn);
        this.stdin.setRawMode(false);
        this.stdin.pause();
        this.showCursor();
    }
    ctrlu() {
        Data_Buffer = "\r ";
        this.stdout.write(Data_Buffer);
    }
    backspace() {
        let Datta_Buffer_Array = Data_Buffer.split("");
        Datta_Buffer_Array.pop();
        Data_Buffer = Datta_Buffer_Array.join("");
        this.stdout.write("\r" + Data_Buffer + " ");
    }
    logger(data) {
        Data_Buffer += data;
        this.stdout.write("\r" + Data_Buffer);
    }
    pn(self) {
        return (c) => {
            switch (c) {
                case '\u0004': // Ctrl-d
                case '\u0015': // Ctrl-u
                    return self.ctrlu();
                case '\r':
                case '\n':
                    return self.enter();
                case '\u0003': // Ctrl-c
                    return self.ctrlc();
                case '\u007F':
                    return self.backspace();
                default:
                    return self.logger(c);
            }
        };
    }
    Color(message, Select_Color) {
        const Color_List = {
            yellow: [33, 89],
            blue: [34, 89],
            green: [32, 89],
            cyan: [35, 89],
            red: [31, 89],
            magenta: [36, 89]
        };
        const _color = Color_List[Select_Color];
        const start = "\x1b[" + _color[0] + "m";
        const stop = "\x1b[" + _color[1] + "m\x1b[0m";
        return start + message + stop;
    }
    controller(parameter) {
        // console.log(this.array.length)
        if (parameter) {
            console.log(this.Color(this.array[notilus].Question, "yellow"));
        }
        this.stdin.setRawMode(true);
        this.stdin.resume();
        this.stdin.setEncoding('utf-8');
        this.hideCursor();
        this.stdin.on("data", this.pn);
    }
    Get_Answers() {
        if (this.array_index !== notilus) {
        }
        else {
            return Answers;
        }
    }
    main() {
        if (this.array_index !== notilus) {
            console.log(this.Color(this.array[notilus].Question, "yellow"));
            this.stdin.setRawMode(true);
            this.stdin.resume();
            this.stdin.setEncoding('utf-8');
            this.hideCursor();
            this.stdin.on("data", this.pn(this));
            return this.emitter;
        }
        else {
            return this.emitter;
        }
    }
}
module.exports = questo;
