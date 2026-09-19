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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = require("cheerio");
var fetch_1 = require("@libs/fetch");
var sanitize_html_1 = __importDefault(require("sanitize-html"));
var aes_1 = require("@noble/ciphers/aes");
var storage_1 = require("@libs/storage");
var WTRLAB = /** @class */ (function () {
    function WTRLAB() {
        this.id = 'WTRLAB_AR';
        this.name = 'WTR-LAB (Arabic)';
        this.icon = 'src/ar/wtrlab/icon.png';
        this.site = 'https://wtr-lab.com/';
        this.version = '1.2.4';
        this.hasCustomSettings = true;
        this.sourceLang = 'en/';
        this.baggage = '';
        this.trace = '';
        this.novelGlossary = {};
        this.chapterListCache = new Map();
    }
    Object.defineProperty(WTRLAB.prototype, "translationModes", {
        get: function () {
            var saved = storage_1.storage.get(WTRLAB.SETTING_TRANSLATION_MODES);
            if (Array.isArray(saved) && saved.length > 0) {
                return saved;
            }
            return __spreadArray([], WTRLAB.ALL_TRANSLATION_MODES, true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WTRLAB.prototype, "sessionCookie", {
        get: function () {
            return storage_1.storage.get(WTRLAB.SETTING_SESSION_COOKIE) || '';
        },
        enumerable: false,
        configurable: true
    });
    WTRLAB.prototype.popularNovels = function (page_1, _a) {
        return __awaiter(this, arguments, void 0, function (page, _b) {
            var link, params, _i, _c, _d, key, value, response, recentNovel, novels, buildId, homePage, homeCheerio, homeNextData, e_1, finderPage, finderCheerio, nextData, e_2, response, json, seenIds_1, novels;
            var showLatestNovels = _b.showLatestNovels, filters = _b.filters;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        link = "".concat(this.site, "en/novel-list?");
                        params = new URLSearchParams({ page: page.toString() });
                        if (filters) {
                            for (_i = 0, _c = Object.entries(filters); _i < _c.length; _i++) {
                                _d = _c[_i], key = _d[0], value = _d[1];
                                if (typeof value === 'object') {
                                    if (value.value.length > 0) {
                                        params.append(key, value.value.join(','));
                                    }
                                }
                                else if (value) {
                                    params.append(key, value.toString());
                                }
                            }
                        }
                        if (!showLatestNovels) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, fetch_1.fetchApi)("".concat(this.site, "api/recent-chapters"), {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ page: page }),
                            })];
                    case 1:
                        response = _e.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        recentNovel = _e.sent();
                        novels = recentNovel.data.map(function (datum) { return ({
                            name: datum.serie.data.title || datum.serie.slug || '',
                            cover: datum.serie.data.image,
                            path: "en/serie-".concat(datum.serie.raw_id, "/").concat(datum.serie.slug || ''),
                        }); });
                        return [2 /*return*/, novels];
                    case 3:
                        buildId = '';
                        _e.label = 4;
                    case 4:
                        _e.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(this.site).then(function (res) { return res.text(); })];
                    case 5:
                        homePage = _e.sent();
                        homeCheerio = (0, cheerio_1.load)(homePage);
                        homeNextData = homeCheerio('#__NEXT_DATA__').html();
                        if (homeNextData) {
                            buildId = JSON.parse(homeNextData).buildId;
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _e.sent();
                        return [3 /*break*/, 7];
                    case 7:
                        if (!!buildId) return [3 /*break*/, 11];
                        _e.label = 8;
                    case 8:
                        _e.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, (0, fetch_1.fetchApi)("".concat(this.site, "en/novel-finder")).then(function (res) { return res.text(); })];
                    case 9:
                        finderPage = _e.sent();
                        finderCheerio = (0, cheerio_1.load)(finderPage);
                        nextData = finderCheerio('#__NEXT_DATA__').html();
                        if (nextData) {
                            buildId = JSON.parse(nextData).buildId;
                        }
                        return [3 /*break*/, 11];
                    case 10:
                        e_2 = _e.sent();
                        return [3 /*break*/, 11];
                    case 11:
                        if (!buildId) {
                            buildId = 'pMQOddAuT2HrrQ64E0YKu';
                        }
                        link = "".concat(this.site, "_next/data/").concat(buildId, "/en/novel-finder.json?").concat(params.toString());
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(link)];
                    case 12:
                        response = _e.sent();
                        return [4 /*yield*/, response.json()];
                    case 13:
                        json = _e.sent();
                        seenIds_1 = new Set();
                        novels = json.pageProps.series
                            .filter(function (novel) {
                            if (seenIds_1.has(novel.raw_id)) {
                                return false;
                            }
                            seenIds_1.add(novel.raw_id);
                            return true;
                        })
                            .map(function (novel) { return ({
                            name: novel.data.title,
                            cover: novel.data.image,
                            path: "en/serie-".concat(novel.raw_id, "/").concat(novel.slug),
                        }); });
                        return [2 /*return*/, novels];
                }
            });
        });
    };
    WTRLAB.prototype.parseNovel = function (novelPath) {
        return __awaiter(this, void 0, void 0, function () {
            var cleanPath, url, body, loadedCheerio, nextDataElement, nextDataText, rawId, slug, novel, jsonData, serieData, match, _a;
            var _b, _c, _d, _e, _f, _g, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        cleanPath = novelPath.replace(/^\/?(?:en|ar)\//, '');
                        url = "".concat(this.site, "en/").concat(cleanPath);
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url).then(function (res) { return res.text(); })];
                    case 1:
                        body = _k.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        nextDataElement = loadedCheerio('#__NEXT_DATA__');
                        nextDataText = nextDataElement.html();
                        rawId = null;
                        slug = null;
                        novel = {
                            path: "en/".concat(cleanPath),
                            name: loadedCheerio('h1.text-uppercase').text().trim(),
                            summary: loadedCheerio('.lead').text().trim(),
                        };
                        if (nextDataText) {
                            try {
                                jsonData = JSON.parse(nextDataText);
                                serieData = (_d = (_c = (_b = jsonData === null || jsonData === void 0 ? void 0 : jsonData.props) === null || _b === void 0 ? void 0 : _b.pageProps) === null || _c === void 0 ? void 0 : _c.serie) === null || _d === void 0 ? void 0 : _d.serie_data;
                                if (serieData) {
                                    novel.name = ((_e = serieData.data) === null || _e === void 0 ? void 0 : _e.title) || novel.name;
                                    novel.cover = ((_f = serieData.data) === null || _f === void 0 ? void 0 : _f.image) || '';
                                    novel.summary = ((_g = serieData.data) === null || _g === void 0 ? void 0 : _g.description) || novel.summary;
                                    novel.author = ((_h = serieData.data) === null || _h === void 0 ? void 0 : _h.author) || '';
                                    rawId = serieData.raw_id || null;
                                    slug = serieData.slug || null;
                                    if ((_j = serieData.data) === null || _j === void 0 ? void 0 : _j.tags) {
                                        novel.genres = serieData.data.tags.join(', ');
                                    }
                                }
                            }
                            catch (e) { }
                        }
                        if (!rawId || !slug) {
                            match = cleanPath.match(/serie-(\d+)\/([^/]+)/);
                            if (match) {
                                rawId = parseInt(match[1], 10);
                                slug = match[2];
                            }
                        }
                        if (!(rawId && slug)) return [3 /*break*/, 3];
                        _a = novel;
                        return [4 /*yield*/, this.fetchAllChapters(rawId, slug)];
                    case 2:
                        _a.chapters = _k.sent();
                        this.chapterListCache.set(rawId, novel.chapters);
                        return [3 /*break*/, 4];
                    case 3:
                        novel.chapters = [];
                        _k.label = 4;
                    case 4: return [2 /*return*/, novel];
                }
            });
        });
    };
    WTRLAB.prototype.fetchTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, fetch_1.fetchApi)("".concat(this.site, "en"))];
                    case 1:
                        response = _a.sent();
                        this.baggage = response.headers.get('baggage') || '';
                        this.trace = response.headers.get('sentry-trace') || '';
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WTRLAB.prototype.decrypt = function (encrypted, encKey) {
        return __awaiter(this, void 0, void 0, function () {
            var t, u, r, _a, iv, tag, ciphertext, combined, keyBytes, aes, decrypted, m;
            return __generator(this, function (_b) {
                try {
                    t = false;
                    u = encrypted;
                    if (encrypted.startsWith('arr:')) {
                        t = true;
                        u = encrypted.substring(4);
                    }
                    else if (encrypted.startsWith('str:')) {
                        u = encrypted.substring(4);
                    }
                    r = u.split(':');
                    if (r.length !== 3)
                        throw new Error('Invalid encrypted data format');
                    _a = r.map(function (part) {
                        return Uint8Array.from(atob(part), function (e) { return e.charCodeAt(0); });
                    }), iv = _a[0], tag = _a[1], ciphertext = _a[2];
                    combined = new Uint8Array(ciphertext.length + tag.length);
                    combined.set(ciphertext);
                    combined.set(tag, ciphertext.length);
                    keyBytes = new TextEncoder().encode(encKey.slice(0, 32));
                    aes = (0, aes_1.gcm)(keyBytes, iv);
                    decrypted = aes.decrypt(combined);
                    m = new TextDecoder().decode(decrypted);
                    if (t)
                        return [2 /*return*/, JSON.parse(m)];
                    return [2 /*return*/, m];
                }
                catch (error) {
                    return [2 /*return*/, { error: "<p>Decryption error: ".concat(error, "</p>") }];
                }
                return [2 /*return*/];
            });
        });
    };
    WTRLAB.prototype.getKey = function ($) {
        return __awaiter(this, void 0, void 0, function () {
            var searchKey, code, index, scripts, URLs, _i, scripts_1, el, src, _a, URLs_1, src, scriptUrl, raw, e_4, home, scriptMatch, _b, scriptMatch_1, s, url, raw, e_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        searchKey = 'TextEncoder().encode("';
                        index = -1;
                        if (!$) return [3 /*break*/, 6];
                        scripts = $('head').find('script').toArray();
                        URLs = [];
                        for (_i = 0, scripts_1 = scripts; _i < scripts_1.length; _i++) {
                            el = scripts_1[_i];
                            src = $(el).attr('src');
                            if (!src || URLs.includes(src))
                                continue;
                            URLs.push(src);
                        }
                        _a = 0, URLs_1 = URLs;
                        _c.label = 1;
                    case 1:
                        if (!(_a < URLs_1.length)) return [3 /*break*/, 6];
                        src = URLs_1[_a];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        scriptUrl = src.startsWith('http') ? src : "".concat(this.site).concat(src.replace(/^\//, ''));
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(scriptUrl).then(function (res) { return res.text(); })];
                    case 3:
                        raw = _c.sent();
                        index = raw.indexOf(searchKey);
                        if (index >= 0) {
                            code = raw;
                            return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_4 = _c.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        _a++;
                        return [3 /*break*/, 1];
                    case 6:
                        if (!!code) return [3 /*break*/, 14];
                        _c.label = 7;
                    case 7:
                        _c.trys.push([7, 13, , 14]);
                        return [4 /*yield*/, (0, fetch_1.fetchApi)("".concat(this.site, "en")).then(function (r) { return r.text(); })];
                    case 8:
                        home = _c.sent();
                        scriptMatch = home.match(/src="(\/_next\/static\/chunks\/[^"]+\.js)"/g);
                        if (!scriptMatch) return [3 /*break*/, 12];
                        _b = 0, scriptMatch_1 = scriptMatch;
                        _c.label = 9;
                    case 9:
                        if (!(_b < scriptMatch_1.length)) return [3 /*break*/, 12];
                        s = scriptMatch_1[_b];
                        url = s.replace('src="', '').replace('"', '');
                        return [4 /*yield*/, (0, fetch_1.fetchApi)("".concat(this.site).concat(url.replace(/^\//, ''))).then(function (r) { return r.text(); })];
                    case 10:
                        raw = _c.sent();
                        index = raw.indexOf(searchKey);
                        if (index >= 0) {
                            code = raw;
                            return [3 /*break*/, 12];
                        }
                        _c.label = 11;
                    case 11:
                        _b++;
                        return [3 /*break*/, 9];
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        e_5 = _c.sent();
                        return [3 /*break*/, 14];
                    case 14:
                        if (!code || index === -1) {
                            return [2 /*return*/, 'IJAFUUxjM25hyzL2AZrn0wl7cESED6Ru'];
                        }
                        return [2 /*return*/, code.substring(index + searchKey.length, index + searchKey.length + 32)];
                }
            });
        });
    };
    WTRLAB.prototype.translate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var contained, response, translated, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        contained = data.map(function (line, i) { return "<a i=".concat(i, ">").concat(line, "</a>"); });
                        return [4 /*yield*/, (0, fetch_1.fetchApi)('https://translate-pa.googleapis.com/v1/translateHtml', {
                                credentials: 'omit',
                                headers: {
                                    'content-type': 'application/json+protobuf',
                                    'X-Goog-API-Key': 'AIzaSyATBXajvzQLTDHEQbcpq0Ihe0vWDHmO520',
                                },
                                referrer: 'https://wtr-lab.com/',
                                body: "[[".concat(JSON.stringify(contained), ",\"auto\",\"ar\"],\"te_lib\"]"),
                                method: 'POST',
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        translated = _a.sent();
                        if (translated && translated[0]) {
                            return [2 /*return*/, translated[0].map(function (line) {
                                    return line.replace(/<\/?a[^>]*>/g, '');
                                })];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: 
                    // Fallback line by line if needed
                    return [2 /*return*/, data];
                }
            });
        });
    };
    WTRLAB.prototype.parseChapter = function (chapterPath) {
        return __awaiter(this, void 0, void 0, function () {
            var cleanPath, url, rawId, chapterNo, urlMatch, loadedCheerio, body, chapterJson, jsonData, modes, candidate, _i, modes_1, type, response, res, e_7, chapterContent, encKey, lines, arabicLines, html, _a, arabicLines_1, line;
            var _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        cleanPath = chapterPath.replace(/^\/?(?:en|ar)\//, '');
                        url = "".concat(this.site, "en/").concat(cleanPath);
                        rawId = null;
                        chapterNo = null;
                        urlMatch = cleanPath.match(/(?:serie|novel)-?(\d+)\/[^/]+\/chapter-(\d+)/);
                        if (urlMatch) {
                            rawId = parseInt(urlMatch[1], 10);
                            chapterNo = parseInt(urlMatch[2], 10);
                        }
                        loadedCheerio = null;
                        if (!(!rawId || !chapterNo)) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url).then(function (res) { return res.text(); })];
                    case 1:
                        body = _f.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        chapterJson = loadedCheerio('#__NEXT_DATA__').html() + '';
                        jsonData = JSON.parse(chapterJson);
                        rawId = jsonData.props.pageProps.serie.chapter.raw_id;
                        chapterNo = jsonData.props.pageProps.serie.chapter.order;
                        _f.label = 2;
                    case 2:
                        if (!rawId || !chapterNo) {
                            throw new Error("Invalid chapter URL: ".concat(chapterPath));
                        }
                        modes = ['web', 'ai', 'raw'];
                        candidate = null;
                        _i = 0, modes_1 = modes;
                        _f.label = 3;
                    case 3:
                        if (!(_i < modes_1.length)) return [3 /*break*/, 9];
                        type = modes_1[_i];
                        _f.label = 4;
                    case 4:
                        _f.trys.push([4, 7, , 8]);
                        return [4 /*yield*/, (0, fetch_1.fetchApi)("".concat(this.site, "api/reader/get"), {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                },
                                referrer: url,
                                body: JSON.stringify({
                                    translate: type,
                                    language: 'en',
                                    raw_id: rawId,
                                    chapter_no: chapterNo,
                                    retry: false,
                                    force_retry: false,
                                }),
                            })];
                    case 5:
                        response = _f.sent();
                        return [4 /*yield*/, response.json()];
                    case 6:
                        res = _f.sent();
                        if ((res === null || res === void 0 ? void 0 : res.success) && ((_c = (_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.body)) {
                            candidate = res;
                            return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        e_7 = _f.sent();
                        return [3 /*break*/, 8];
                    case 8:
                        _i++;
                        return [3 /*break*/, 3];
                    case 9:
                        if (!((_e = (_d = candidate === null || candidate === void 0 ? void 0 : candidate.data) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.body)) {
                            throw new Error('Chapter content could not be retrieved from WTR-LAB.');
                        }
                        chapterContent = candidate.data.data.body;
                        if (!(typeof chapterContent === 'string' &&
                            (chapterContent.startsWith('arr:') || chapterContent.startsWith('str:')))) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.getKey(loadedCheerio)];
                    case 10:
                        encKey = _f.sent();
                        return [4 /*yield*/, this.decrypt(chapterContent, encKey)];
                    case 11:
                        chapterContent = _f.sent();
                        if (chapterContent === null || chapterContent === void 0 ? void 0 : chapterContent.error) {
                            return [2 /*return*/, "<p>".concat(chapterContent.error, "</p>")];
                        }
                        _f.label = 12;
                    case 12:
                        lines = [];
                        if (Array.isArray(chapterContent)) {
                            lines = chapterContent;
                        }
                        else if (typeof chapterContent === 'string') {
                            try {
                                lines = JSON.parse(chapterContent);
                            }
                            catch (e) {
                                lines = [chapterContent];
                            }
                        }
                        return [4 /*yield*/, this.translate(lines)];
                    case 13:
                        arabicLines = _f.sent();
                        html = '';
                        for (_a = 0, arabicLines_1 = arabicLines; _a < arabicLines_1.length; _a++) {
                            line = arabicLines_1[_a];
                            html += "<p>".concat((0, sanitize_html_1.default)(line), "</p>");
                        }
                        return [2 /*return*/, html];
                }
            });
        });
    };
    WTRLAB.prototype.fetchAllChapters = function (rawId, slug) {
        return __awaiter(this, void 0, void 0, function () {
            var allChapters, batchSize, page, response, data, _i, _a, ch, e_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        allChapters = [];
                        batchSize = 500;
                        page = 1;
                        _b.label = 1;
                    case 1:
                        if (!(page <= 40)) return [3 /*break*/, 7];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, (0, fetch_1.fetchApi)("".concat(this.site, "api/serie/").concat(rawId, "/chapters?page=").concat(page, "&limit=").concat(batchSize))];
                    case 3:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 4:
                        data = _b.sent();
                        if (!(data === null || data === void 0 ? void 0 : data.chapters) || data.chapters.length === 0)
                            return [3 /*break*/, 7];
                        for (_i = 0, _a = data.chapters; _i < _a.length; _i++) {
                            ch = _a[_i];
                            allChapters.push({
                                name: ch.title ? "Chapter ".concat(ch.order, ": ").concat(ch.title) : "Chapter ".concat(ch.order),
                                path: "en/serie-".concat(rawId, "/").concat(slug, "/chapter-").concat(ch.order),
                                chapterNumber: ch.order,
                            });
                        }
                        if (data.chapters.length < batchSize)
                            return [3 /*break*/, 7];
                        return [3 /*break*/, 6];
                    case 5:
                        e_8 = _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        page++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/, allChapters];
                }
            });
        });
    };
    WTRLAB.prototype.searchNovels = function (searchTerm) {
        return __awaiter(this, void 0, void 0, function () {
            var res, data, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, fetch_1.fetchApi)("".concat(this.site, "api/search"), {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ text: searchTerm }),
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        if (data === null || data === void 0 ? void 0 : data.data) {
                            return [2 /*return*/, data.data.map(function (novel) {
                                    var _a, _b, _c;
                                    return ({
                                        name: ((_a = novel.data) === null || _a === void 0 ? void 0 : _a.title) || novel.slug,
                                        cover: (_b = novel.data) === null || _b === void 0 ? void 0 : _b.image,
                                        path: "en/serie-".concat(novel.raw_id || ((_c = novel.serie) === null || _c === void 0 ? void 0 : _c.raw_id), "/").concat(novel.slug),
                                    });
                                })];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_9 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, []];
                }
            });
        });
    };
    WTRLAB.ALL_TRANSLATION_MODES = [
        'local',
        'web',
        'ai',
        'raw',
    ];
    WTRLAB.SETTING_TRANSLATION_MODES = 'translationModes';
    WTRLAB.SETTING_SESSION_COOKIE = 'sessionCookie';
    return WTRLAB;
}());
exports.default = new WTRLAB();
