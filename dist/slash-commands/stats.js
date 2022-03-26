"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.run = exports.commands = void 0;
var discord_js_1 = require("discord.js");
var requests_1 = require("../utils/requests");
var emotes_1 = require("../utils/emotes");
var legends_1 = require("../utils/legends");
var string_1 = require("../utils/string");
var SlashCommandBuilder = require('@discordjs/builders').SlashCommandBuilder;
exports.commands = [
    __assign({}, new SlashCommandBuilder()
        .setName('statistics')
        .setDescription('Get statistics of a player')
        .addStringOption(function (option) {
        return option.setName('username')
            .setDescription('A unique Origin ID')
            .setRequired(true);
    })
        .addStringOption(function (option) {
        option.setName('legend')
            .setDescription('Legend name for stats')
            .setRequired(false);
        legends_1.legendsList.map(function (legend_name) { option.addChoice((0, string_1.capitalize)(legend_name), legend_name); });
        return option;
    })
        .addStringOption(function (option) {
        return option.setName('plateform')
            .setDescription('The platform of the player (Default PC)')
            .addChoice('PC', 'PC')
            .addChoice('PS4', 'PS4')
            .addChoice('X1', 'X1')
            .setRequired(false);
    }))
];
var run = function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var originId, selectedLegend, platform, result, field, legend, specials_trackers, _i, _a, tracker, trackerName, username, accountLevel, rankdBadge, rankName, rankScore, legendName, embed, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                originId = interaction.options.getString('username');
                selectedLegend = interaction.options.getString('legend');
                platform = interaction.options.get('plateform');
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, requests_1.default)("player", "GET", null, { origin_id: originId, platform: platform })];
            case 2:
                result = _b.sent();
                if (result) {
                    field = [];
                    legend = void 0;
                    if (selectedLegend) {
                        legend = result.legends.all[selectedLegend];
                        if (legend === undefined) {
                            interaction.reply({ content: 'No stats found for this player with ' + selectedLegend + ' legend' });
                        }
                    }
                    else {
                        legend = result.legends.selected;
                    }
                    specials_trackers = ["specialEvent_kills", "specialEvent_wins", "specialEvent_damage"];
                    for (_i = 0, _a = legend.trackers; _i < _a.length; _i++) {
                        tracker = _a[_i];
                        trackerName = void 0;
                        if (specials_trackers.includes(tracker.name)) {
                            trackerName = (0, string_1.capitalize)(tracker.name.split('_').at(-1));
                        }
                        else {
                            trackerName = (0, string_1.capitalize)(tracker.name.split('_').join(' '));
                        }
                        field.push({ name: trackerName, value: "".concat(tracker.value), inline: true });
                    }
                    username = result.account.username;
                    accountLevel = result.account.level;
                    rankdBadge = emotes_1.badges[result.account.rank.rank_name];
                    rankName = (0, string_1.capitalize)(result.account.rank.rank_name) + ' ' + result.account.rank.rank_division;
                    rankScore = result.account.rank.rank_score;
                    legendName = (0, string_1.capitalize)(legend.name);
                    embed = new discord_js_1.MessageEmbed()
                        .setColor('#851a2a')
                        .setTitle("".concat(username, "'s statistics"))
                        .setDescription("".concat(emotes_1.badges.level, " **LVL ").concat(accountLevel, "**\n") +
                        "".concat(rankdBadge, " **").concat(rankName, "** (").concat(rankScore, " RP)\n") +
                        "Currently playing **".concat((0, string_1.capitalize)(result.legends.selected.name), "**\n\n") +
                        "__**".concat(legendName, " Statistics:**__"))
                        .setFields(field)
                        .setImage("https://cdn.apex-bot.defou.fr//banners/".concat(legend.name, ".jpeg"))
                        .setFooter({ text: "Player ".concat(result.session.online ? 'online' : 'offline', " - Created by PotagerDeNavets") });
                    interaction.reply({ embeds: [embed] });
                }
                else {
                    interaction.reply({ content: 'hmm, something went wrong' });
                }
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                console.log(e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.run = run;
//# sourceMappingURL=stats.js.map