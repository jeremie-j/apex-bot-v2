"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSlashCommands = exports.synchronizeSlashCommands = void 0;
var discord_js_1 = require("discord.js");
var collection_1 = require("@discordjs/collection");
var fs_1 = require("fs");
var synchronizeSlashCommands = function (client, commands, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var log, ready, currentCommands, _a, newCommands, _i, newCommands_1, newCommand, deletedCommands, _b, deletedCommands_1, deletedCommand, updatedCommands, updatedCommandCount, _loop_1, _c, updatedCommands_1, updatedCommand;
        var _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    log = function (message) { return options.debug && console.log(message); };
                    ready = client.readyAt ? Promise.resolve() : new Promise(function (resolve) { return client.once('ready', resolve); });
                    return [4 /*yield*/, ready];
                case 1:
                    _f.sent();
                    if (!options.guildId) return [3 /*break*/, 3];
                    return [4 /*yield*/, client.application.commands.fetch({
                            guildId: options.guildId,
                        })];
                case 2:
                    _a = _f.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, client.application.commands.fetch()];
                case 4:
                    _a = _f.sent();
                    _f.label = 5;
                case 5:
                    currentCommands = _a;
                    log("Synchronizing commands...");
                    log("Currently ".concat(currentCommands.size, " commands."));
                    newCommands = commands.filter(function (command) { return !currentCommands.some(function (c) { return c.name === command.name; }); });
                    _i = 0, newCommands_1 = newCommands;
                    _f.label = 6;
                case 6:
                    if (!(_i < newCommands_1.length)) return [3 /*break*/, 11];
                    newCommand = newCommands_1[_i];
                    if (!options.guildId) return [3 /*break*/, 8];
                    return [4 /*yield*/, client.application.commands.create(newCommand, options.guildId)];
                case 7:
                    _f.sent();
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, client.application.commands.create(newCommand)];
                case 9:
                    _f.sent();
                    _f.label = 10;
                case 10:
                    _i++;
                    return [3 /*break*/, 6];
                case 11:
                    log("Created ".concat(newCommands.length, " commands!"));
                    deletedCommands = currentCommands.filter(function (command) { return !commands.some(function (c) { return c.name === command.name; }); }).toJSON();
                    _b = 0, deletedCommands_1 = deletedCommands;
                    _f.label = 12;
                case 12:
                    if (!(_b < deletedCommands_1.length)) return [3 /*break*/, 15];
                    deletedCommand = deletedCommands_1[_b];
                    return [4 /*yield*/, deletedCommand.delete()];
                case 13:
                    _f.sent();
                    _f.label = 14;
                case 14:
                    _b++;
                    return [3 /*break*/, 12];
                case 15:
                    log("Deleted ".concat(deletedCommands.length, " commands!"));
                    updatedCommands = commands.filter(function (command) { return currentCommands.some(function (c) { return c.name === command.name; }); });
                    updatedCommandCount = 0;
                    _loop_1 = function (updatedCommand) {
                        var newCommand, previousCommand, modified;
                        return __generator(this, function (_g) {
                            switch (_g.label) {
                                case 0:
                                    newCommand = updatedCommand;
                                    previousCommand = currentCommands.find(function (c) { return c.name === updatedCommand.name; });
                                    modified = false;
                                    if (previousCommand.description !== newCommand.description)
                                        modified = true;
                                    if (!discord_js_1.ApplicationCommand.optionsEqual((_d = previousCommand.options) !== null && _d !== void 0 ? _d : [], (_e = newCommand.options) !== null && _e !== void 0 ? _e : []))
                                        modified = true;
                                    if (!modified) return [3 /*break*/, 2];
                                    return [4 /*yield*/, previousCommand.edit(newCommand)];
                                case 1:
                                    _g.sent();
                                    updatedCommandCount++;
                                    _g.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    };
                    _c = 0, updatedCommands_1 = updatedCommands;
                    _f.label = 16;
                case 16:
                    if (!(_c < updatedCommands_1.length)) return [3 /*break*/, 19];
                    updatedCommand = updatedCommands_1[_c];
                    return [5 /*yield**/, _loop_1(updatedCommand)];
                case 17:
                    _f.sent();
                    _f.label = 18;
                case 18:
                    _c++;
                    return [3 /*break*/, 16];
                case 19:
                    log("Updated ".concat(updatedCommandCount, " commands!"));
                    log("Commands synchronized!");
                    return [2 /*return*/, {
                            currentCommandCount: currentCommands.size,
                            newCommandCount: newCommands.length,
                            deletedCommandCount: deletedCommands.length,
                            updatedCommandCount: updatedCommandCount
                        }];
            }
        });
    });
};
exports.synchronizeSlashCommands = synchronizeSlashCommands;
var loadSlashCommands = function (client) {
    var commands = new collection_1.Collection();
    var commandsData = [];
    try {
        (0, fs_1.readdirSync)("".concat(__dirname, "/slash-commands")).forEach(function (file) {
            if (file.endsWith('.js')) {
                var command_1 = require("".concat(__dirname, "/slash-commands/").concat(file));
                if (!command_1.commands)
                    return console.log("".concat(file, " has no commands"));
                commandsData.push.apply(commandsData, command_1.commands);
                command_1.commands.forEach(function (commandData) {
                    commands.set(commandData.name, command_1.run);
                    console.log("Loaded slash command ".concat(commandData.name));
                });
            }
        });
    }
    catch (e) {
        console.log(e);
        console.log("No slash commands found");
    }
    (0, exports.synchronizeSlashCommands)(client, commandsData, {
        debug: true,
        guildId: '458780660119764993'
    });
    return commands;
};
exports.loadSlashCommands = loadSlashCommands;
//# sourceMappingURL=commands.js.map