require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
	"use strict";
	/**
	 * Copyright 2018 Novage LLC.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
			if (k2 === undefined) k2 = k;
			Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
			if (k2 === undefined) k2 = k;
			o[k2] = m[k];
	}));
	var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
			Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
			o["default"] = v;
	});
	var __importStar = (this && this.__importStar) || function (mod) {
			if (mod && mod.__esModule) return mod;
			var result = {};
			if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
			__setModuleDefault(result, mod);
			return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	const hlsjs = __importStar(require("./index"));
	if (!window.p2pml) {
			window.p2pml = {};
	}
	window.p2pml.hlsjs = hlsjs;
	
	},{"./index":"p2p-media-loader-hlsjs"}],2:[function(require,module,exports){
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.byteRangeToString = exports.compareByteRanges = exports.getByteRange = void 0;
	function getByteRange(context) {
			return context.rangeEnd && context.rangeStart !== undefined
					? { offset: context.rangeStart, length: context.rangeEnd - context.rangeStart }
					: undefined;
	}
	exports.getByteRange = getByteRange;
	function compareByteRanges(b1, b2) {
			return b1 === undefined ? b2 === undefined : b2 !== undefined && b1.length === b2.length && b1.offset === b2.offset;
	}
	exports.compareByteRanges = compareByteRanges;
	function byteRangeToString(byteRange) {
			if (byteRange === undefined) {
					return undefined;
			}
			const end = byteRange.offset + byteRange.length - 1;
			return `bytes=${byteRange.offset}-${end}`;
	}
	exports.byteRangeToString = byteRangeToString;
	
	},{}],3:[function(require,module,exports){
	"use strict";
	/**
	 * Copyright 2018 Novage LLC.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Engine = void 0;
	const events_1 = require("events");
	const p2p_media_loader_core_1 = require("@peertube/p2p-media-loader-core");
	const segment_manager_1 = require("./segment-manager");
	const hlsjs_loader_1 = require("./hlsjs-loader");
	class Engine extends events_1.EventEmitter {
			constructor(settings = {}) {
					super();
					this.loader = new p2p_media_loader_core_1.HybridLoader(settings.loader);
					this.segmentManager = new segment_manager_1.SegmentManager(this.loader, settings.segments);
					Object.keys(p2p_media_loader_core_1.Events)
							.map((eventKey) => p2p_media_loader_core_1.Events[eventKey])
							.forEach((event) => this.loader.on(event, (...args) => this.emit(event, ...args)));
			}
			static isSupported() {
					return p2p_media_loader_core_1.HybridLoader.isSupported();
			}
			createLoaderClass() {
					var _a;
					const engine = this; // eslint-disable-line @typescript-eslint/no-this-alias
					return _a = class {
									constructor() {
											this.load = async (context, config, callbacks) => {
													this.context = context;
													this.callbacks = callbacks;
													await this.impl.load(context, config, callbacks);
											};
											this.abort = () => {
													if (this.context) {
															this.impl.abort(this.context, this.callbacks);
													}
											};
											this.destroy = () => {
													if (this.context) {
															this.impl.abort(this.context);
													}
											};
											this.getResponseHeader = () => undefined;
											this.impl = new hlsjs_loader_1.HlsJsLoader(engine.segmentManager);
											this.stats = this.impl.stats;
									}
							},
							_a.getEngine = () => {
									return engine;
							},
							_a;
			}
			async destroy() {
					await this.segmentManager.destroy();
			}
			getSettings() {
					return {
							segments: this.segmentManager.getSettings(),
							loader: this.loader.getSettings(),
					};
			}
			getDetails() {
					return {
							loader: this.loader.getDetails(),
					};
			}
			setPlayingSegment(url, byteRange, start, duration) {
					this.segmentManager.setPlayingSegment(url, byteRange, start, duration);
			}
			setPlayingSegmentByCurrentTime(playheadPosition) {
					this.segmentManager.setPlayingSegmentByCurrentTime(playheadPosition);
			}
	}
	exports.Engine = Engine;
	
	},{"./hlsjs-loader":4,"./segment-manager":5,"@peertube/p2p-media-loader-core":14,"events":"events"}],4:[function(require,module,exports){
	"use strict";
	/**
	 * Copyright 2018 Novage LLC.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HlsJsLoader = void 0;
	const p2p_media_loader_core_1 = require("@peertube/p2p-media-loader-core");
	const byte_range_1 = require("./byte-range");
	class HlsJsLoader {
			constructor(segmentManager) {
					this.isLoaded = false;
					this.stats = {
							loaded: 0,
							total: 0,
							aborted: false,
							retry: 0,
							chunkCount: 0,
							bwEstimate: 0,
							loading: {
									start: 0,
									end: 0,
									first: 0,
							},
							parsing: {
									start: 0,
									end: 0,
							},
							buffering: {
									start: 0,
									end: 0,
									first: 0,
							},
					};
					this.segmentManager = segmentManager;
			}
			async load(context, _config, callbacks) {
					HlsJsLoader.updateStatsToStartLoading(this.stats);
					if (context.type) {
							try {
									const result = await this.segmentManager.loadPlaylist(context.url);
									this.isLoaded = true;
									this.successPlaylist(result, context, callbacks);
							}
							catch (e) {
									this.error(e, context, callbacks);
							}
					}
					else if (context.frag) {
							const { loader } = this.segmentManager;
							const byteRange = byte_range_1.getByteRange(context);
							const isSegment = (segment) => {
									return segment.url === context.url && segment.range === byte_range_1.byteRangeToString(byteRange);
							};
							// We may be downloading the segment by P2P, so we don't care about the stats sent to HLS ABR
							let updateStart = setInterval(() => {
									HlsJsLoader.updateStatsToStartLoading(this.stats);
							}, 200);
							const onUpdateSegmentSize = (segment, size) => {
									if (!isSegment(segment))
											return;
									this.stats.total = size;
							};
							loader.on(p2p_media_loader_core_1.Events.SegmentSize, onUpdateSegmentSize);
							const onUpdateLoaded = (_type, segment, bytes) => {
									if (!isSegment(segment))
											return;
									this.stats.loaded += bytes;
							};
							const onSegmentStartLoad = (method, segment) => {
									if (!updateStart || method !== "http" || !isSegment(segment))
											return;
									clearInterval(updateStart);
									updateStart = undefined;
									HlsJsLoader.updateStatsToStartLoading(this.stats);
									loader.on(p2p_media_loader_core_1.Events.PieceBytesDownloaded, onUpdateLoaded);
							};
							loader.on(p2p_media_loader_core_1.Events.SegmentStartLoad, onSegmentStartLoad);
							try {
									const result = await this.segmentManager.loadSegment(context.url, byteRange);
									const { content } = result;
									if (content) {
											this.isLoaded = true;
											setTimeout(() => this.successSegment(content, context, callbacks), 0);
									}
							}
							catch (e) {
									setTimeout(() => this.error(e, context, callbacks), 0);
							}
							finally {
									clearInterval(updateStart);
									loader.off(p2p_media_loader_core_1.Events.SegmentStartLoad, onSegmentStartLoad);
									loader.off(p2p_media_loader_core_1.Events.SegmentSize, onUpdateSegmentSize);
									loader.off(p2p_media_loader_core_1.Events.PieceBytesDownloaded, onUpdateLoaded);
							}
					}
					else {
							console.warn("Unknown load request", context);
					}
			}
			abort(context, callbacks) {
					if (this.isLoaded)
							return;
					this.segmentManager.abortSegment(context.url, byte_range_1.getByteRange(context));
					this.stats.aborted = true;
					const onAbort = callbacks === null || callbacks === void 0 ? void 0 : callbacks.onAbort;
					if (onAbort) {
							onAbort(this.stats, context, undefined);
					}
			}
			successPlaylist(xhr, context, callbacks) {
					const now = performance.now();
					this.stats.loading.end = now;
					this.stats.loaded = xhr.response.length;
					this.stats.total = xhr.response.length;
					callbacks.onSuccess({
							url: xhr.responseURL,
							data: xhr.response,
					}, this.stats, context, undefined);
			}
			successSegment(content, context, callbacks) {
					const now = performance.now();
					this.stats.loading.end = now;
					this.stats.loaded = content.byteLength;
					this.stats.total = content.byteLength;
					if (callbacks.onProgress) {
							callbacks.onProgress(this.stats, context, content, undefined);
					}
					callbacks.onSuccess({
							url: context.url,
							data: content,
					}, this.stats, context, undefined);
			}
			error(error, context, callbacks) {
					callbacks.onError(error, context, undefined);
			}
			static updateStatsToStartLoading(stats) {
					const start = performance.now();
					stats.loading.start = start;
					stats.loading.first = start;
			}
	}
	exports.HlsJsLoader = HlsJsLoader;
	
	},{"./byte-range":2,"@peertube/p2p-media-loader-core":14}],5:[function(require,module,exports){
	"use strict";
	/**
	 * Copyright 2018 Novage LLC.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SegmentManager = void 0;
	const p2p_media_loader_core_1 = require("@peertube/p2p-media-loader-core");
	const m3u8_parser_1 = require("m3u8-parser");
	const byte_range_1 = require("./byte-range");
	const defaultSettings = {
			forwardSegmentCount: 20,
			swarmId: undefined,
			assetsStorage: undefined,
	};
	class SegmentManager {
			constructor(loader, settings = {}) {
					this.masterPlaylist = null;
					this.variantPlaylists = new Map();
					this.segmentRequest = null;
					this.playQueue = [];
					this.onSegmentLoaded = (segment) => {
							if (this.segmentRequest &&
									this.segmentRequest.segmentUrl === segment.url &&
									byte_range_1.byteRangeToString(this.segmentRequest.segmentByteRange) === segment.range) {
									// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
									this.segmentRequest.onSuccess(segment.data.slice(0), segment.downloadBandwidth);
									this.segmentRequest = null;
							}
					};
					this.onSegmentError = (segment, error) => {
							if (this.segmentRequest &&
									this.segmentRequest.segmentUrl === segment.url &&
									byte_range_1.byteRangeToString(this.segmentRequest.segmentByteRange) === segment.range) {
									this.segmentRequest.onError(error);
									this.segmentRequest = null;
							}
					};
					this.onSegmentAbort = (segment) => {
							if (this.segmentRequest &&
									this.segmentRequest.segmentUrl === segment.url &&
									byte_range_1.byteRangeToString(this.segmentRequest.segmentByteRange) === segment.range) {
									this.segmentRequest.onError("Loading aborted: internal abort");
									this.segmentRequest = null;
							}
					};
					this.settings = Object.assign(Object.assign({}, defaultSettings), settings);
					this.loader = loader;
					this.loader.on(p2p_media_loader_core_1.Events.SegmentLoaded, this.onSegmentLoaded);
					this.loader.on(p2p_media_loader_core_1.Events.SegmentError, this.onSegmentError);
					this.loader.on(p2p_media_loader_core_1.Events.SegmentAbort, this.onSegmentAbort);
			}
			getSettings() {
					return this.settings;
			}
			processPlaylist(requestUrl, content, responseUrl) {
					const parser = new m3u8_parser_1.Parser();
					parser.push(content);
					parser.end();
					const playlist = new Playlist(requestUrl, responseUrl, parser.manifest);
					if (playlist.manifest.playlists) {
							this.masterPlaylist = playlist;
							for (const [key, variantPlaylist] of this.variantPlaylists) {
									const { streamSwarmId, found, index } = this.getStreamSwarmId(variantPlaylist.requestUrl);
									if (!found) {
											this.variantPlaylists.delete(key);
									}
									else {
											variantPlaylist.streamSwarmId = streamSwarmId;
											variantPlaylist.streamId = "V" + index.toString();
									}
							}
					}
					else {
							const { streamSwarmId, found, index } = this.getStreamSwarmId(requestUrl);
							if (found || this.masterPlaylist === null) {
									// do not add audio and subtitles to variants
									playlist.streamSwarmId = streamSwarmId;
									playlist.streamId = this.masterPlaylist === null ? undefined : "V" + index.toString();
									this.variantPlaylists.set(requestUrl, playlist);
									this.updateSegments();
							}
					}
			}
			async loadPlaylist(url) {
					const assetsStorage = this.settings.assetsStorage;
					let xhr;
					if (assetsStorage !== undefined) {
							let masterSwarmId;
							masterSwarmId = this.getMasterSwarmId();
							if (masterSwarmId === undefined) {
									masterSwarmId = url.split("?")[0];
							}
							const asset = await assetsStorage.getAsset(url, undefined, masterSwarmId);
							if (asset !== undefined) {
									xhr = {
											responseURL: asset.responseUri,
											response: asset.data,
									};
							}
							else {
									xhr = await this.loadContent(url, "text");
									void assetsStorage.storeAsset({
											masterManifestUri: this.masterPlaylist !== null ? this.masterPlaylist.requestUrl : url,
											masterSwarmId: masterSwarmId,
											requestUri: url,
											responseUri: xhr.responseURL,
											data: xhr.response,
									});
							}
					}
					else {
							xhr = await this.loadContent(url, "text");
					}
					this.processPlaylist(url, xhr.response, xhr.responseURL);
					return xhr;
			}
			async loadSegment(url, byteRange) {
					var _a;
					const segmentLocation = this.getSegmentLocation(url, byteRange);
					const byteRangeString = byte_range_1.byteRangeToString(byteRange);
					if (!segmentLocation) {
							let content;
							// Not a segment from variants; usually can be: init, audio or subtitles segment, encryption key etc.
							const assetsStorage = this.settings.assetsStorage;
							if (assetsStorage !== undefined) {
									let masterManifestUri = (_a = this.masterPlaylist) === null || _a === void 0 ? void 0 : _a.requestUrl;
									let masterSwarmId;
									masterSwarmId = this.getMasterSwarmId();
									if (masterSwarmId === undefined && this.variantPlaylists.size === 1) {
											const result = this.variantPlaylists.values().next();
											if (!result.done) {
													// always true
													masterSwarmId = result.value.requestUrl.split("?")[0];
											}
									}
									if (masterManifestUri === undefined && this.variantPlaylists.size === 1) {
											const result = this.variantPlaylists.values().next();
											if (!result.done) {
													// always true
													masterManifestUri = result.value.requestUrl;
											}
									}
									if (masterSwarmId !== undefined && masterManifestUri !== undefined) {
											const asset = await assetsStorage.getAsset(url, byteRangeString, masterSwarmId);
											if (asset !== undefined) {
													content = asset.data;
											}
											else {
													const xhr = await this.loadContent(url, "arraybuffer", byteRangeString);
													content = xhr.response;
													void assetsStorage.storeAsset({
															masterManifestUri: masterManifestUri,
															masterSwarmId: masterSwarmId,
															requestUri: url,
															requestRange: byteRangeString,
															responseUri: xhr.responseURL,
															data: content,
													});
											}
									}
							}
							if (content === undefined) {
									const xhr = await this.loadContent(url, "arraybuffer", byteRangeString);
									content = xhr.response;
							}
							return { content, downloadBandwidth: 0 };
					}
					const segmentSequence = (segmentLocation.playlist.manifest.mediaSequence ? segmentLocation.playlist.manifest.mediaSequence : 0) +
							segmentLocation.segmentIndex;
					if (this.playQueue.length > 0) {
							const previousSegment = this.playQueue[this.playQueue.length - 1];
							if (previousSegment.segmentSequence !== segmentSequence - 1) {
									// Reset play queue in case of segment loading out of sequence
									this.playQueue = [];
							}
					}
					if (this.segmentRequest) {
							this.segmentRequest.onError("Cancel segment request: simultaneous segment requests are not supported");
					}
					const promise = new Promise((resolve, reject) => {
							this.segmentRequest = new SegmentRequest(url, byteRange, segmentSequence, segmentLocation.playlist.requestUrl, (content, downloadBandwidth) => resolve({ content, downloadBandwidth }), (error) => reject(error));
					});
					this.playQueue.push({ segmentUrl: url, segmentByteRange: byteRange, segmentSequence: segmentSequence });
					void this.loadSegments(segmentLocation.playlist, segmentLocation.segmentIndex, true);
					return promise;
			}
			setPlayingSegment(url, byteRange, start, duration) {
					const urlIndex = this.playQueue.findIndex((segment) => segment.segmentUrl === url && byte_range_1.compareByteRanges(segment.segmentByteRange, byteRange));
					if (urlIndex >= 0) {
							this.playQueue = this.playQueue.slice(urlIndex);
							this.playQueue[0].playPosition = { start, duration };
							this.updateSegments();
					}
			}
			setPlayingSegmentByCurrentTime(playheadPosition) {
					if (this.playQueue.length === 0 || !this.playQueue[0].playPosition) {
							return;
					}
					const currentSegmentPosition = this.playQueue[0].playPosition;
					const segmentEndTime = currentSegmentPosition.start + currentSegmentPosition.duration;
					if (segmentEndTime - playheadPosition < 0.2) {
							// means that current segment is (almost) finished playing
							// remove it from queue
							this.playQueue = this.playQueue.slice(1);
							this.updateSegments();
					}
			}
			abortSegment(url, byteRange) {
					if (this.segmentRequest &&
							this.segmentRequest.segmentUrl === url &&
							byte_range_1.compareByteRanges(this.segmentRequest.segmentByteRange, byteRange)) {
							this.segmentRequest.onSuccess(undefined, 0);
							this.segmentRequest = null;
					}
			}
			async destroy() {
					if (this.segmentRequest) {
							this.segmentRequest.onError("Loading aborted: object destroyed");
							this.segmentRequest = null;
					}
					this.masterPlaylist = null;
					this.variantPlaylists.clear();
					this.playQueue = [];
					if (this.settings.assetsStorage !== undefined) {
							await this.settings.assetsStorage.destroy();
					}
					await this.loader.destroy();
			}
			updateSegments() {
					if (!this.segmentRequest) {
							return;
					}
					const segmentLocation = this.getSegmentLocation(this.segmentRequest.segmentUrl, this.segmentRequest.segmentByteRange);
					if (segmentLocation) {
							void this.loadSegments(segmentLocation.playlist, segmentLocation.segmentIndex, false);
					}
			}
			getSegmentLocation(url, byteRange) {
					for (const playlist of this.variantPlaylists.values()) {
							const segmentIndex = playlist.getSegmentIndex(url, byteRange);
							if (segmentIndex >= 0) {
									return { playlist: playlist, segmentIndex: segmentIndex };
							}
					}
					return undefined;
			}
			async loadSegments(playlist, segmentIndex, requestFirstSegment) {
					var _a;
					const segments = [];
					const playlistSegments = playlist.manifest.segments;
					const initialSequence = (_a = playlist.manifest.mediaSequence) !== null && _a !== void 0 ? _a : 0;
					let loadSegmentId = null;
					let priority = Math.max(0, this.playQueue.length - 1);
					const masterSwarmId = this.getMasterSwarmId();
					for (let i = segmentIndex; i < playlistSegments.length && segments.length < this.settings.forwardSegmentCount; ++i) {
							const segment = playlist.manifest.segments[i];
							const url = playlist.getSegmentAbsoluteUrl(segment.uri);
							const byteRange = segment.byterange;
							const id = this.getSegmentId(playlist, initialSequence + i);
							segments.push({
									id: id,
									url: url,
									masterSwarmId: masterSwarmId !== undefined ? masterSwarmId : playlist.streamSwarmId,
									masterManifestUri: this.masterPlaylist !== null ? this.masterPlaylist.requestUrl : playlist.requestUrl,
									streamId: playlist.streamId,
									sequence: (initialSequence + i).toString(),
									range: byte_range_1.byteRangeToString(byteRange),
									priority: priority++,
							});
							if (requestFirstSegment && !loadSegmentId) {
									loadSegmentId = id;
							}
					}
					this.loader.load(segments, playlist.streamSwarmId);
					if (loadSegmentId) {
							const segment = await this.loader.getSegment(loadSegmentId);
							if (segment) {
									// Segment already loaded by loader
									this.onSegmentLoaded(segment);
							}
					}
			}
			getSegmentId(playlist, segmentSequence) {
					return `${playlist.streamSwarmId}+${segmentSequence}`;
			}
			getMasterSwarmId() {
					const settingsSwarmId = this.settings.swarmId && this.settings.swarmId.length !== 0 ? this.settings.swarmId : undefined;
					if (settingsSwarmId !== undefined) {
							return settingsSwarmId;
					}
					return this.masterPlaylist !== null ? this.masterPlaylist.requestUrl.split("?")[0] : undefined;
			}
			getStreamSwarmId(playlistUrl) {
					const masterSwarmId = this.getMasterSwarmId();
					if (this.masterPlaylist && this.masterPlaylist.manifest.playlists && masterSwarmId) {
							for (let i = 0; i < this.masterPlaylist.manifest.playlists.length; ++i) {
									const url = new URL(this.masterPlaylist.manifest.playlists[i].uri, this.masterPlaylist.responseUrl).toString();
									if (url === playlistUrl) {
											return { streamSwarmId: `${masterSwarmId}+V${i}`, found: true, index: i };
									}
							}
					}
					// Функция для сайта LiteLibria.com
					// Подмена доменов серверов на static.libria.fun для объединения потоков
					let urlPlaylist = new URL(playlistUrl);
					var newPlaylist = playlistUrl.replace(urlPlaylist.host, 'static.libria.fun');
					
					
					return {
							streamSwarmId: masterSwarmId !== null && masterSwarmId !== void 0 ? masterSwarmId : newPlaylist.split("?")[0],
							found: false,
							index: -1,
					};
			}
			async loadContent(url, responseType, range) {
					return new Promise((resolve, reject) => {
							const xhr = new XMLHttpRequest();
							xhr.open("GET", url, true);
							xhr.responseType = responseType;
							if (range) {
									xhr.setRequestHeader("Range", range);
							}
							xhr.addEventListener("readystatechange", () => {
									if (xhr.readyState !== 4)
											return;
									if (xhr.status >= 200 && xhr.status < 300) {
											resolve(xhr);
									}
									else {
											reject(xhr.statusText);
									}
							});
							const xhrSetup = this.loader.getSettings().xhrSetup;
							if (xhrSetup) {
									xhrSetup(xhr, url);
							}
							xhr.send();
					});
			}
	}
	exports.SegmentManager = SegmentManager;
	class Playlist {
			constructor(requestUrl, responseUrl, manifest) {
					this.requestUrl = requestUrl;
					this.responseUrl = responseUrl;
					this.manifest = manifest;
					this.streamSwarmId = "";
			}
			getSegmentIndex(url, byteRange) {
					for (let i = 0; i < this.manifest.segments.length; ++i) {
							const segment = this.manifest.segments[i];
							const segmentUrl = this.getSegmentAbsoluteUrl(segment.uri);
							if (url === segmentUrl && byte_range_1.compareByteRanges(segment.byterange, byteRange)) {
									return i;
							}
					}
					return -1;
			}
			getSegmentAbsoluteUrl(segmentUrl) {
					return new URL(segmentUrl, this.responseUrl).toString();
			}
	}
	class SegmentRequest {
			constructor(segmentUrl, segmentByteRange, segmentSequence, playlistRequestUrl, onSuccess, onError) {
					this.segmentUrl = segmentUrl;
					this.segmentByteRange = segmentByteRange;
					this.segmentSequence = segmentSequence;
					this.playlistRequestUrl = playlistRequestUrl;
					this.onSuccess = onSuccess;
					this.onError = onError;
			}
	}
	
	},{"./byte-range":2,"@peertube/p2p-media-loader-core":14,"m3u8-parser":32}],6:[function(require,module,exports){
	function _assertThisInitialized(self) {
		if (self === void 0) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}
	
		return self;
	}
	
	module.exports = _assertThisInitialized;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	},{}],7:[function(require,module,exports){
	function _extends() {
		module.exports = _extends = Object.assign || function (target) {
			for (var i = 1; i < arguments.length; i++) {
				var source = arguments[i];
	
				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}
	
			return target;
		};
	
		module.exports["default"] = module.exports, module.exports.__esModule = true;
		return _extends.apply(this, arguments);
	}
	
	module.exports = _extends;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	},{}],8:[function(require,module,exports){
	var setPrototypeOf = require("./setPrototypeOf.js");
	
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		setPrototypeOf(subClass, superClass);
	}
	
	module.exports = _inheritsLoose;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	},{"./setPrototypeOf.js":10}],9:[function(require,module,exports){
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			"default": obj
		};
	}
	
	module.exports = _interopRequireDefault;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	},{}],10:[function(require,module,exports){
	function _setPrototypeOf(o, p) {
		module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
	
		module.exports["default"] = module.exports, module.exports.__esModule = true;
		return _setPrototypeOf(o, p);
	}
	
	module.exports = _setPrototypeOf;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	},{}],11:[function(require,module,exports){
	"use strict";
	/**
	 * Copyright 2018 Novage LLC.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	var __importDefault = (this && this.__importDefault) || function (mod) {
			return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BandwidthApproximator = void 0;
	const debug_1 = __importDefault(require("debug"));
	const debug = debug_1.default("p2pml:bandwidth-approximator");
	const SMOOTH_INTERVAL = 2 * 1000;
	const MEASURE_INTERVAL = 40 * 1000;
	class NumberWithTime {
			constructor(value, timeStamp) {
					this.value = value;
					this.timeStamp = timeStamp;
			}
	}
	class BandwidthApproximator {
			constructor() {
					this.lastBytes = [];
					this.currentBytesSum = 0;
					this.lastBandwidth = [];
					this.addBytes = (bytes, timeStamp) => {
							debug("Add %d bytes.", bytes);
							this.lastBytes.push(new NumberWithTime(bytes, timeStamp));
							this.currentBytesSum += bytes;
							while (timeStamp - this.lastBytes[0].timeStamp > SMOOTH_INTERVAL) {
									// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
									this.currentBytesSum -= this.lastBytes.shift().value;
							}
							const interval = Math.min(SMOOTH_INTERVAL, timeStamp);
							this.lastBandwidth.push(new NumberWithTime(this.currentBytesSum / interval, timeStamp));
					};
					// in bytes per millisecond
					this.getBandwidth = (timeStamp) => {
							while (this.lastBandwidth.length !== 0 && timeStamp - this.lastBandwidth[0].timeStamp > MEASURE_INTERVAL) {
									this.lastBandwidth.shift();
							}
							let maxBandwidth = 0;
							for (const bandwidth of this.lastBandwidth) {
									if (bandwidth.value > maxBandwidth) {
											maxBandwidth = bandwidth.value;
									}
							}
							debug("Max bandwidth: %d.", maxBandwidth);
							return maxBandwidth;
					};
					this.getSmoothInterval = () => {
							return SMOOTH_INTERVAL;
					};
					this.getMeasureInterval = () => {
							return MEASURE_INTERVAL;
					};
			}
	}
	exports.BandwidthApproximator = BandwidthApproximator;
	
	},{"debug":"debug"}],12:[function(require,module,exports){
	"use strict";
	/**
	 * Copyright 2018 Novage LLC.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	var __importDefault = (this && this.__importDefault) || function (mod) {
			return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HttpMediaManager = void 0;
	const debug_1 = __importDefault(require("debug"));
	const stringly_typed_event_emitter_1 = require("./stringly-typed-event-emitter");
	class FilteredEmitter extends stringly_typed_event_emitter_1.STEEmitter {
	}
	class HttpMediaManager extends FilteredEmitter {
			constructor(settings) {
					super();
					this.settings = settings;
					this.xhrRequests = new Map();
					this.failedSegments = new Map();
					this.debug = debug_1.default("p2pml:http-media-manager");
					this.download = (segment, downloadedPieces) => {
							if (this.isDownloading(segment)) {
									return;
							}
							this.cleanTimedOutFailedSegments();
							this.emit("segment-start-load", segment);
							const segmentUrl = this.buildSegmentUrl(segment);
							this.debug("http segment download", segmentUrl);
							segment.requestUrl = segmentUrl;
							const xhr = new XMLHttpRequest();
							xhr.open("GET", segmentUrl, true);
							xhr.responseType = "arraybuffer";
							if (segment.range) {
									xhr.setRequestHeader("Range", segment.range);
									downloadedPieces = undefined; // TODO: process downloadedPieces for segments with range headers too
							}
							else if (downloadedPieces !== undefined && this.settings.httpUseRanges) {
									let bytesDownloaded = 0;
									for (const piece of downloadedPieces) {
											bytesDownloaded += piece.byteLength;
									}
									xhr.setRequestHeader("Range", `bytes=${bytesDownloaded}-`);
									this.debug("continue download from", bytesDownloaded);
							}
							else {
									downloadedPieces = undefined;
							}
							this.setupXhrEvents(xhr, segment, downloadedPieces);
							if (this.settings.xhrSetup) {
									this.settings.xhrSetup(xhr, segmentUrl);
							}
							this.xhrRequests.set(segment.id, { xhr, segment, initialPriority: segment.priority, segmentUrl });
							xhr.send();
					};
					this.updatePriority = (segment) => {
							const request = this.xhrRequests.get(segment.id);
							if (!request) {
									throw new Error("Cannot update priority of not downloaded segment " + segment.id);
							}
							// Segment is now in high priority
							// If the segment URL changed, retry the request with the new URL
							if (segment.priority <= this.settings.requiredSegmentsPriority &&
									request.initialPriority > this.settings.requiredSegmentsPriority &&
									request.segmentUrl !== this.buildSegmentUrl(segment)) {
									this.debug("aborting http segment abort because the segment is now in a high priority", segment.id);
									this.abort(segment);
									this.download(segment);
							}
					};
					this.abort = (segment) => {
							const request = this.xhrRequests.get(segment.id);
							if (request) {
									request.xhr.abort();
									this.xhrRequests.delete(segment.id);
									this.debug("http segment abort", segment.id);
							}
					};
					this.isDownloading = (segment) => {
							return this.xhrRequests.has(segment.id);
					};
					this.isFailed = (segment) => {
							const time = this.failedSegments.get(segment.id);
							return time !== undefined && time > this.now();
					};
					this.getActiveDownloads = () => {
							return this.xhrRequests;
					};
					this.getActiveDownloadsCount = () => {
							return this.xhrRequests.size;
					};
					this.destroy = () => {
							this.xhrRequests.forEach((request) => request.xhr.abort());
							this.xhrRequests.clear();
					};
					this.setupXhrEvents = (xhr, segment, downloadedPieces) => {
							let prevBytesLoaded = 0;
							xhr.addEventListener("progress", (event) => {
									const bytesLoaded = event.loaded - prevBytesLoaded;
									this.emit("bytes-downloaded", segment, bytesLoaded);
									prevBytesLoaded = event.loaded;
									if (event.lengthComputable) {
											this.emit("segment-size", segment, event.total);
									}
							});
							xhr.addEventListener("load", async (event) => {
									if (xhr.status < 200 || xhr.status >= 300) {
											this.segmentFailure(segment, event, xhr);
											return;
									}
									let data = xhr.response;
									if (downloadedPieces !== undefined && xhr.status === 206) {
											let bytesDownloaded = 0;
											for (const piece of downloadedPieces) {
													bytesDownloaded += piece.byteLength;
											}
											const segmentData = new Uint8Array(bytesDownloaded + data.byteLength);
											let offset = 0;
											for (const piece of downloadedPieces) {
													segmentData.set(new Uint8Array(piece), offset);
													offset += piece.byteLength;
											}
											segmentData.set(new Uint8Array(data), offset);
											data = segmentData.buffer;
									}
									await this.segmentDownloadFinished(segment, data, xhr);
							});
							xhr.addEventListener("error", (event) => {
									this.segmentFailure(segment, event, xhr);
							});
							xhr.addEventListener("timeout", (event) => {
									this.segmentFailure(segment, event, xhr);
							});
					};
					this.segmentDownloadFinished = async (segment, data, xhr) => {
							segment.responseUrl = xhr.responseURL === null ? undefined : xhr.responseURL;
							if (this.settings.segmentValidator) {
									try {
											await this.settings.segmentValidator(Object.assign(Object.assign({}, segment), { data: data }), "http");
									}
									catch (error) {
											this.debug("segment validator failed", error);
											this.segmentFailure(segment, error, xhr);
											return;
									}
							}
							this.xhrRequests.delete(segment.id);
							this.emit("segment-loaded", segment, data);
					};
					this.segmentFailure = (segment, error, xhr) => {
							segment.responseUrl = xhr.responseURL === null ? undefined : xhr.responseURL;
							this.xhrRequests.delete(segment.id);
							this.failedSegments.set(segment.id, this.now() + this.settings.httpFailedSegmentTimeout);
							this.emit("segment-error", segment, error);
					};
					this.cleanTimedOutFailedSegments = () => {
							const now = this.now();
							const candidates = [];
							this.failedSegments.forEach((time, id) => {
									if (time < now) {
											candidates.push(id);
									}
							});
							candidates.forEach((id) => this.failedSegments.delete(id));
					};
					this.now = () => performance.now();
			}
			buildSegmentUrl(segment) {
					if (this.settings.segmentUrlBuilder) {
							return this.settings.segmentUrlBuilder(segment);
					}
					return segment.url;
			}
	}
	exports.HttpMediaManager = HttpMediaManager;
	
	},{"./stringly-typed-event-emitter":19,"debug":"debug"}],13:[function(require,module,exports){
	"use strict";
	/**
	 * Copyright 2018 Novage LLC.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	var __importDefault = (this && this.__importDefault) || function (mod) {
			return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HybridLoader = void 0;
	const debug_1 = __importDefault(require("debug"));
	const events_1 = require("events");
	const simple_peer_1 = __importDefault(require("simple-peer"));
	const loader_interface_1 = require("./loader-interface");
	const http_media_manager_1 = require("./http-media-manager");
	const p2p_media_manager_1 = require("./p2p-media-manager");
	const media_peer_1 = require("./media-peer");
	const bandwidth_approximator_1 = require("./bandwidth-approximator");
	const segments_memory_storage_1 = require("./segments-memory-storage");
	const defaultSettings = {
			cachedSegmentExpiration: 5 * 60 * 1000,
			cachedSegmentsCount: 30,
			useP2P: true,
			consumeOnly: false,
			requiredSegmentsPriority: 1,
			simultaneousHttpDownloads: 2,
			httpDownloadProbability: 0.1,
			httpDownloadProbabilityInterval: 1000,
			httpDownloadProbabilitySkipIfNoPeers: false,
			httpFailedSegmentTimeout: 10000,
			httpDownloadMaxPriority: 20,
			httpDownloadInitialTimeout: 0,
			httpDownloadInitialTimeoutPerSegment: 4000,
			httpUseRanges: false,
			simultaneousP2PDownloads: 3,
			p2pDownloadMaxPriority: 20,
			p2pSegmentDownloadTimeout: 60000,
			webRtcMaxMessageSize: 64 * 1024 - 1,
			trackerAnnounce: ["wss://tracker.novage.com.ua", "wss://tracker.openwebtorrent.com"],
			peerRequestsPerAnnounce: 10,
			rtcConfig: simple_peer_1.default.config,
	};
	class HybridLoader extends events_1.EventEmitter {
			constructor(settings = {}) {
					super();
					this.debug = debug_1.default("p2pml:hybrid-loader");
					this.debugSegments = debug_1.default("p2pml:hybrid-loader-segments");
					this.segmentsQueue = [];
					this.bandwidthApproximator = new bandwidth_approximator_1.BandwidthApproximator();
					this.httpDownloadInitialTimeoutTimestamp = -Infinity;
					this.createHttpManager = () => {
							return new http_media_manager_1.HttpMediaManager(this.settings);
					};
					this.createP2PManager = () => {
							return new p2p_media_manager_1.P2PMediaManager(this.segmentsStorage, this.settings);
					};
					this.load = async (segments, streamSwarmId) => {
							if (this.httpRandomDownloadInterval === undefined) {
									// Do once on first call
									this.httpRandomDownloadInterval = setInterval(this.downloadRandomSegmentOverHttp, this.settings.httpDownloadProbabilityInterval);
									if (this.settings.httpDownloadInitialTimeout > 0 &&
											this.settings.httpDownloadInitialTimeoutPerSegment > 0) {
											// Initialize initial HTTP download timeout (i.e. download initial segments over P2P)
											this.debugSegments("enable initial HTTP download timeout", this.settings.httpDownloadInitialTimeout, "per segment", this.settings.httpDownloadInitialTimeoutPerSegment);
											this.httpDownloadInitialTimeoutTimestamp = this.now();
											setTimeout(this.processInitialSegmentTimeout, this.settings.httpDownloadInitialTimeoutPerSegment + 100);
									}
							}
							if (segments.length > 0) {
									this.masterSwarmId = segments[0].masterSwarmId;
							}
							if (this.masterSwarmId !== undefined) {
									this.p2pManager.setStreamSwarmId(streamSwarmId, this.masterSwarmId);
							}
							this.debug("load segments");
							let updateSegmentsMap = false;
							// stop all http requests and p2p downloads for segments that are not in the new load
							for (const segment of this.segmentsQueue) {
									if (!segments.find((f) => f.url === segment.url)) {
											this.debug("remove segment", segment.url);
											if (this.httpManager.isDownloading(segment)) {
													updateSegmentsMap = true;
													this.httpManager.abort(segment);
											}
											else {
													this.p2pManager.abort(segment);
											}
											this.emit(loader_interface_1.Events.SegmentAbort, segment);
									}
							}
							if (this.debug.enabled) {
									for (const segment of segments) {
											if (!this.segmentsQueue.find((f) => f.url === segment.url)) {
													this.debug("add segment", segment.url);
											}
									}
							}
							this.segmentsQueue = segments;
							if (this.masterSwarmId === undefined) {
									return;
							}
							let storageSegments = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
							updateSegmentsMap = this.processSegmentsQueue(storageSegments) || updateSegmentsMap;
							if (await this.cleanSegmentsStorage()) {
									storageSegments = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
									updateSegmentsMap = true;
							}
							if (updateSegmentsMap && !this.settings.consumeOnly) {
									this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
							}
					};
					this.getSegment = async (id) => {
							return this.masterSwarmId === undefined ? undefined : this.segmentsStorage.getSegment(id, this.masterSwarmId);
					};
					this.getSettings = () => {
							return this.settings;
					};
					this.getDetails = () => {
							return {
									peerId: this.p2pManager.getPeerId(),
							};
					};
					this.getBandwidthEstimate = () => {
							return this.bandwidthApproximator.getBandwidth(this.now());
					};
					this.destroy = async () => {
							if (this.httpRandomDownloadInterval !== undefined) {
									clearInterval(this.httpRandomDownloadInterval);
									this.httpRandomDownloadInterval = undefined;
							}
							this.httpDownloadInitialTimeoutTimestamp = -Infinity;
							this.segmentsQueue = [];
							this.httpManager.destroy();
							this.p2pManager.destroy();
							this.masterSwarmId = undefined;
							await this.segmentsStorage.destroy();
					};
					this.processInitialSegmentTimeout = async () => {
							if (this.httpRandomDownloadInterval === undefined) {
									return; // Instance destroyed
							}
							if (this.masterSwarmId !== undefined) {
									const storageSegments = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
									if (this.processSegmentsQueue(storageSegments) && !this.settings.consumeOnly) {
											this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
									}
							}
							if (this.httpDownloadInitialTimeoutTimestamp !== -Infinity) {
									// Set one more timeout for a next segment
									setTimeout(this.processInitialSegmentTimeout, this.settings.httpDownloadInitialTimeoutPerSegment);
							}
					};
					this.processSegmentsQueue = (storageSegments) => {
							this.debugSegments("process segments queue. priority", this.segmentsQueue.length > 0 ? this.segmentsQueue[0].priority : 0);
							if (this.masterSwarmId === undefined || this.segmentsQueue.length === 0) {
									return false;
							}
							let updateSegmentsMap = false;
							let segmentsMap;
							let httpAllowed = true;
							if (this.httpDownloadInitialTimeoutTimestamp !== -Infinity) {
									let firstNotDownloadePriority;
									for (const segment of this.segmentsQueue) {
											if (!storageSegments.has(segment.id)) {
													firstNotDownloadePriority = segment.priority;
													break;
											}
									}
									const httpTimeout = this.now() - this.httpDownloadInitialTimeoutTimestamp;
									httpAllowed =
											httpTimeout >= this.settings.httpDownloadInitialTimeout ||
													(firstNotDownloadePriority !== undefined &&
															httpTimeout > this.settings.httpDownloadInitialTimeoutPerSegment &&
															firstNotDownloadePriority <= 0);
									if (httpAllowed) {
											this.debugSegments("cancel initial HTTP download timeout - timed out");
											this.httpDownloadInitialTimeoutTimestamp = -Infinity;
									}
							}
							let scheduleNewProcessQueue = false;
							for (let index = 0; index < this.segmentsQueue.length; index++) {
									const segment = this.segmentsQueue[index];
									if (storageSegments.has(segment.id)) {
											continue;
									}
									// Segment priority changed, notify http manager
									if (this.httpManager.isDownloading(segment)) {
											this.httpManager.updatePriority(segment);
											continue;
									}
									const tryHTTP = httpAllowed && segment.priority <= this.settings.requiredSegmentsPriority;
									if (tryHTTP && !this.httpManager.isFailed(segment)) {
											// Download required segments over HTTP
											if (this.httpManager.getActiveDownloadsCount() >= this.settings.simultaneousHttpDownloads) {
													// Not enough HTTP download resources. Abort one of the HTTP downloads.
													for (let i = this.segmentsQueue.length - 1; i > index; i--) {
															const segmentToAbort = this.segmentsQueue[i];
															if (this.httpManager.isDownloading(segmentToAbort)) {
																	this.debugSegments("cancel HTTP download", segmentToAbort.priority, segmentToAbort.url);
																	this.httpManager.abort(segmentToAbort);
																	break;
															}
													}
											}
											if (this.httpManager.getActiveDownloadsCount() < this.settings.simultaneousHttpDownloads) {
													// Abort P2P download of the required segment if any and force HTTP download
													const downloadedPieces = this.p2pManager.abort(segment);
													this.httpManager.download(segment, downloadedPieces);
													this.debugSegments("HTTP download (priority)", segment.priority, segment.url);
													updateSegmentsMap = true;
													continue;
											}
									}
									// We wanted to download a failed segment through HTTP, but we could not because of the timeout.
									// Then we need to scedule another processing queue task
									if (tryHTTP && this.httpManager.isFailed(segment)) {
											scheduleNewProcessQueue = true;
									}
									if (this.p2pManager.isDownloading(segment)) {
											continue;
									}
									if (segment.priority <= this.settings.requiredSegmentsPriority) {
											// Download required segments over P2P
											segmentsMap = segmentsMap ? segmentsMap : this.p2pManager.getOverallSegmentsMap();
											if (segmentsMap.get(segment.id) !== media_peer_1.MediaPeerSegmentStatus.Loaded) {
													continue;
											}
											if (this.p2pManager.getActiveDownloadsCount() >= this.settings.simultaneousP2PDownloads) {
													// Not enough P2P download resources. Abort one of the P2P downloads.
													for (let i = this.segmentsQueue.length - 1; i > index; i--) {
															const segmentToAbort = this.segmentsQueue[i];
															if (this.p2pManager.isDownloading(segmentToAbort)) {
																	this.debugSegments("cancel P2P download", segmentToAbort.priority, segmentToAbort.url);
																	this.p2pManager.abort(segmentToAbort);
																	break;
															}
													}
											}
											if (this.p2pManager.getActiveDownloadsCount() < this.settings.simultaneousP2PDownloads) {
													if (this.p2pManager.download(segment)) {
															this.debugSegments("P2P download (priority)", segment.priority, segment.url);
															continue;
													}
											}
											continue;
									}
									if (this.p2pManager.getActiveDownloadsCount() < this.settings.simultaneousP2PDownloads &&
											segment.priority <= this.settings.p2pDownloadMaxPriority) {
											if (this.p2pManager.download(segment)) {
													this.debugSegments("P2P download", segment.priority, segment.url);
											}
									}
							}
							if (scheduleNewProcessQueue) {
									setTimeout(async () => {
											if (this.masterSwarmId === undefined)
													return;
											const storageSegments = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
											this.processSegmentsQueue(storageSegments);
									}, this.settings.httpFailedSegmentTimeout);
							}
							return updateSegmentsMap;
					};
					this.downloadRandomSegmentOverHttp = async () => {
							if (this.masterSwarmId === undefined ||
									this.httpRandomDownloadInterval === undefined ||
									this.httpDownloadInitialTimeoutTimestamp !== -Infinity ||
									this.httpManager.getActiveDownloadsCount() >= this.settings.simultaneousHttpDownloads ||
									(this.settings.httpDownloadProbabilitySkipIfNoPeers && this.p2pManager.getPeers().size === 0) ||
									this.settings.consumeOnly) {
									return;
							}
							const storageSegments = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
							const segmentsMap = this.p2pManager.getOverallSegmentsMap();
							const pendingQueue = this.segmentsQueue.filter((s) => !this.p2pManager.isDownloading(s) &&
									!this.httpManager.isDownloading(s) &&
									!segmentsMap.has(s.id) &&
									!this.httpManager.isFailed(s) &&
									s.priority <= this.settings.httpDownloadMaxPriority &&
									!storageSegments.has(s.id));
							if (pendingQueue.length === 0) {
									return;
							}
							if (Math.random() > this.settings.httpDownloadProbability * pendingQueue.length) {
									return;
							}
							const segment = pendingQueue[Math.floor(Math.random() * pendingQueue.length)];
							this.debugSegments("HTTP download (random)", segment.priority, segment.url);
							this.httpManager.download(segment);
							this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
					};
					this.onSegmentStartLoad = (method, segment) => {
							this.emit(loader_interface_1.Events.SegmentStartLoad, method, segment);
					};
					this.onPieceBytesDownloaded = (method, segment, bytes, peerId) => {
							this.bandwidthApproximator.addBytes(bytes, this.now());
							this.emit(loader_interface_1.Events.PieceBytesDownloaded, method, segment, bytes, peerId);
					};
					this.onPieceBytesUploaded = (method, segment, bytes, peerId) => {
							this.emit(loader_interface_1.Events.PieceBytesUploaded, method, segment, bytes, peerId);
					};
					this.onSegmentLoaded = async (segment, data, peerId) => {
							this.debugSegments("segment loaded", segment.id, segment.url);
							if (this.masterSwarmId === undefined) {
									return;
							}
							segment.data = data;
							segment.downloadBandwidth = this.bandwidthApproximator.getBandwidth(this.now());
							await this.segmentsStorage.storeSegment(segment);
							this.emit(loader_interface_1.Events.SegmentLoaded, segment, peerId);
							const storageSegments = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
							this.processSegmentsQueue(storageSegments);
							if (!this.settings.consumeOnly) {
									this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
							}
					};
					this.onSegmentError = async (segment, details, peerId) => {
							this.debugSegments("segment error", segment.id, segment.url, peerId, details);
							this.emit(loader_interface_1.Events.SegmentError, segment, details, peerId);
							if (this.masterSwarmId !== undefined) {
									const storageSegments = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
									if (this.processSegmentsQueue(storageSegments) && !this.settings.consumeOnly) {
											this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
									}
							}
					};
					this.onSegmentSize = async (segment, size) => {
							this.debugSegments("segment size", segment.id, size);
							this.emit(loader_interface_1.Events.SegmentSize, segment, size);
					};
					this.getStreamSwarmId = (segment) => {
							return segment.streamId === undefined ? segment.masterSwarmId : `${segment.masterSwarmId}+${segment.streamId}`;
					};
					this.createSegmentsMap = (storageSegments) => {
							const segmentsMap = {};
							const addSegmentToMap = (segment, status) => {
									const streamSwarmId = this.getStreamSwarmId(segment);
									const segmentId = segment.sequence;
									let segmentsIdsAndStatuses = segmentsMap[streamSwarmId];
									if (segmentsIdsAndStatuses === undefined) {
											segmentsIdsAndStatuses = ["", []];
											segmentsMap[streamSwarmId] = segmentsIdsAndStatuses;
									}
									const segmentsStatuses = segmentsIdsAndStatuses[1];
									segmentsIdsAndStatuses[0] += segmentsStatuses.length === 0 ? segmentId : `|${segmentId}`;
									segmentsStatuses.push(status);
							};
							for (const storageSegment of storageSegments.values()) {
									addSegmentToMap(storageSegment.segment, media_peer_1.MediaPeerSegmentStatus.Loaded);
							}
							for (const download of this.httpManager.getActiveDownloads().values()) {
									addSegmentToMap(download.segment, media_peer_1.MediaPeerSegmentStatus.LoadingByHttp);
							}
							return segmentsMap;
					};
					this.onPeerConnect = async (peer) => {
							this.emit(loader_interface_1.Events.PeerConnect, peer);
							if (!this.settings.consumeOnly && this.masterSwarmId !== undefined) {
									this.p2pManager.sendSegmentsMap(peer.id, this.createSegmentsMap(await this.segmentsStorage.getSegmentsMap(this.masterSwarmId)));
							}
					};
					this.onPeerClose = (peerId) => {
							this.emit(loader_interface_1.Events.PeerClose, peerId);
					};
					this.onTrackerUpdate = async (data) => {
							if (this.httpDownloadInitialTimeoutTimestamp !== -Infinity &&
									data.incomplete !== undefined &&
									data.incomplete <= 1) {
									this.debugSegments("cancel initial HTTP download timeout - no peers");
									this.httpDownloadInitialTimeoutTimestamp = -Infinity;
									if (this.masterSwarmId !== undefined) {
											const storageSegments = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
											if (this.processSegmentsQueue(storageSegments) && !this.settings.consumeOnly) {
													this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
											}
									}
							}
					};
					this.cleanSegmentsStorage = async () => {
							if (this.masterSwarmId === undefined) {
									return false;
							}
							return this.segmentsStorage.clean(this.masterSwarmId, (id) => this.segmentsQueue.find((queueSegment) => queueSegment.id === id) !== undefined);
					};
					this.now = () => {
							return performance.now();
					};
					this.settings = Object.assign(Object.assign({}, defaultSettings), settings);
					const { bufferedSegmentsCount } = settings;
					if (typeof bufferedSegmentsCount === "number") {
							if (settings.p2pDownloadMaxPriority === undefined) {
									this.settings.p2pDownloadMaxPriority = bufferedSegmentsCount;
							}
							if (settings.httpDownloadMaxPriority === undefined) {
									this.settings.p2pDownloadMaxPriority = bufferedSegmentsCount;
							}
					}
					this.segmentsStorage =
							this.settings.segmentsStorage === undefined
									? new segments_memory_storage_1.SegmentsMemoryStorage(this.settings)
									: this.settings.segmentsStorage;
					this.debug("loader settings", this.settings);
					this.httpManager = this.createHttpManager();
					this.httpManager.on("segment-start-load", (segment) => this.onSegmentStartLoad("http", segment));
					this.httpManager.on("segment-loaded", this.onSegmentLoaded);
					this.httpManager.on("segment-error", this.onSegmentError);
					this.httpManager.on("segment-size", this.onSegmentSize);
					this.httpManager.on("bytes-downloaded", (segment, bytes) => {
							this.onPieceBytesDownloaded("http", segment, bytes);
					});
					this.p2pManager = this.createP2PManager();
					this.p2pManager.on("segment-start-load", (segment) => this.onSegmentStartLoad("p2p", segment));
					this.p2pManager.on("segment-loaded", this.onSegmentLoaded);
					this.p2pManager.on("segment-error", this.onSegmentError);
					this.p2pManager.on("segment-size", this.onSegmentSize);
					this.p2pManager.on("peer-data-updated", async () => {
							if (this.masterSwarmId === undefined) {
									return;
							}
							const storageSegments = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
							if (this.processSegmentsQueue(storageSegments) && !this.settings.consumeOnly) {
									this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
							}
					});
					this.p2pManager.on("bytes-downloaded", (segment, bytes, peerId) => this.onPieceBytesDownloaded("p2p", segment, bytes, peerId));
					this.p2pManager.on("bytes-uploaded", (segment, bytes, peerId) => this.onPieceBytesUploaded("p2p", segment, bytes, peerId));
					this.p2pManager.on("peer-connected", this.onPeerConnect);
					this.p2pManager.on("peer-closed", this.onPeerClose);
					this.p2pManager.on("tracker-update", this.onTrackerUpdate);
			}
	}
	exports.HybridLoader = HybridLoader;
	HybridLoader.isSupported = () => {
			return window.RTCPeerConnection.prototype.createDataChannel !== undefined;
	};
	
	},{"./bandwidth-approximator":11,"./http-media-manager":12,"./loader-interface":15,"./media-peer":16,"./p2p-media-manager":17,"./segments-memory-storage":18,"debug":"debug","events":"events","simple-peer":56}],14:[function(require,module,exports){
	"use strict";
	/**
	 * @license Apache-2.0
	 * Copyright 2018 Novage LLC.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
			if (k2 === undefined) k2 = k;
			Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
			if (k2 === undefined) k2 = k;
			o[k2] = m[k];
	}));
	var __exportStar = (this && this.__exportStar) || function(m, exports) {
			for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.version = void 0;
	exports.version = "0.6.2";
	__exportStar(require("./loader-interface"), exports);
	__exportStar(require("./hybrid-loader"), exports);
	
	},{"./hybrid-loader":13,"./loader-interface":15}],15:[function(require,module,exports){
	"use strict";
	/**
	 * Copyright 2018 Novage LLC.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Events = void 0;
	var Events;
	(function (Events) {
			/**
			 * Emitted when segment has been downloaded.
			 * Args: segment
			 */
			Events["SegmentLoaded"] = "segment_loaded";
			/**
			 * Emitted when an error occurred while loading the segment.
			 * Args: segment, error
			 */
			Events["SegmentError"] = "segment_error";
			/**
			 * Emitter when we the segment size is known
			 * Args: segment, size
			 */
			Events["SegmentSize"] = "segment_size";
			/**
			 * Emitted for each segment that does not hit into a new segments queue when the load() method is called.
			 * Args: segment
			 */
			Events["SegmentAbort"] = "segment_abort";
			/**
			 * Emitted when the loader started to load a segment
			 * Args: method, segment
			 */
			Events["SegmentStartLoad"] = "segment_start_load";
			/**
			 * Emitted when a peer is connected.
			 * Args: peer
			 */
			Events["PeerConnect"] = "peer_connect";
			/**
			 * Emitted when a peer is disconnected.
			 * Args: peerId
			 */
			Events["PeerClose"] = "peer_close";
			/**
			 * Emitted when a segment piece has been downloaded.
			 * Args: method (can be "http" or "p2p" only), bytes
			 */
			Events["PieceBytesDownloaded"] = "piece_bytes_downloaded";
			/**
			 * Emitted when a segment piece has been uploaded.
			 * Args: method (can be "p2p" only), bytes
			 */
			Events["PieceBytesUploaded"] = "piece_bytes_uploaded";
	})(Events = exports.Events || (exports.Events = {}));
	
	},{}],16:[function(require,module,exports){
	"use strict";
	/**
	 * Copyright 2018 Novage LLC.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	var __importDefault = (this && this.__importDefault) || function (mod) {
			return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MediaPeer = exports.MediaPeerSegmentStatus = void 0;
	/* eslint-disable @typescript-eslint/no-unsafe-call */
	/* eslint-disable @typescript-eslint/no-unsafe-member-access */
	/* eslint-disable @typescript-eslint/no-unsafe-assignment */
	const debug_1 = __importDefault(require("debug"));
	const buffer_1 = require("buffer");
	const stringly_typed_event_emitter_1 = require("./stringly-typed-event-emitter");
	var MediaPeerCommands;
	(function (MediaPeerCommands) {
			MediaPeerCommands[MediaPeerCommands["SegmentData"] = 0] = "SegmentData";
			MediaPeerCommands[MediaPeerCommands["SegmentAbsent"] = 1] = "SegmentAbsent";
			MediaPeerCommands[MediaPeerCommands["SegmentsMap"] = 2] = "SegmentsMap";
			MediaPeerCommands[MediaPeerCommands["SegmentRequest"] = 3] = "SegmentRequest";
			MediaPeerCommands[MediaPeerCommands["CancelSegmentRequest"] = 4] = "CancelSegmentRequest";
	})(MediaPeerCommands || (MediaPeerCommands = {}));
	var MediaPeerSegmentStatus;
	(function (MediaPeerSegmentStatus) {
			MediaPeerSegmentStatus[MediaPeerSegmentStatus["Loaded"] = 0] = "Loaded";
			MediaPeerSegmentStatus[MediaPeerSegmentStatus["LoadingByHttp"] = 1] = "LoadingByHttp";
	})(MediaPeerSegmentStatus = exports.MediaPeerSegmentStatus || (exports.MediaPeerSegmentStatus = {}));
	class DownloadingSegment {
			constructor(id, size) {
					this.id = id;
					this.size = size;
					this.bytesDownloaded = 0;
					this.pieces = [];
			}
	}
	class MediaPeer extends stringly_typed_event_emitter_1.STEEmitter {
			constructor(
			// eslint-disable-next-line
			peer, settings) {
					super();
					this.peer = peer;
					this.settings = settings;
					this.remoteAddress = "";
					this.downloadingSegmentId = null;
					this.downloadingSegment = null;
					this.segmentsMap = new Map();
					this.debug = debug_1.default("p2pml:media-peer");
					this.timer = null;
					this.onPeerConnect = () => {
							this.debug("peer connect", this.id, this);
							this.remoteAddress = this.peer.remoteAddress;
							this.emit("connect", this);
					};
					this.onPeerClose = () => {
							this.debug("peer close", this.id, this);
							this.terminateSegmentRequest();
							this.emit("close", this);
					};
					this.onPeerError = (error) => {
							this.debug("peer error", this.id, error, this);
					};
					this.receiveSegmentPiece = (data) => {
							if (!this.downloadingSegment) {
									// The segment was not requested or canceled
									this.debug("peer segment not requested", this.id, this);
									return;
							}
							this.downloadingSegment.bytesDownloaded += data.byteLength;
							this.downloadingSegment.pieces.push(data);
							const segmentId = this.downloadingSegment.id;
							this.emit("bytes-downloaded", this, segmentId, data.byteLength);
							if (this.downloadingSegment.bytesDownloaded === this.downloadingSegment.size) {
									const segmentData = new Uint8Array(this.downloadingSegment.size);
									let offset = 0;
									for (const piece of this.downloadingSegment.pieces) {
											segmentData.set(new Uint8Array(piece), offset);
											offset += piece.byteLength;
									}
									this.debug("peer segment download done", this.id, segmentId, this);
									this.terminateSegmentRequest();
									this.emit("segment-loaded", this, segmentId, segmentData.buffer);
							}
							else if (this.downloadingSegment.bytesDownloaded > this.downloadingSegment.size) {
									this.debug("peer segment download bytes mismatch", this.id, segmentId, this);
									this.terminateSegmentRequest();
									this.emit("segment-error", this, segmentId, "Too many bytes received for segment");
							}
					};
					this.getJsonCommand = (data) => {
							const bytes = new Uint8Array(data);
							// Serialized JSON string check by first, second and last characters: '{" .... }'
							if (bytes[0] === 123 && bytes[1] === 34 && bytes[data.byteLength - 1] === 125) {
									try {
											return JSON.parse(new TextDecoder().decode(data));
									}
									catch (_a) {
											return null;
									}
							}
							return null;
					};
					this.onPeerData = (data) => {
							const command = this.getJsonCommand(data);
							if (command === null) {
									this.receiveSegmentPiece(data);
									return;
							}
							if (this.downloadingSegment) {
									this.debug("peer segment download is interrupted by a command", this.id, this);
									const segmentId = this.downloadingSegment.id;
									this.terminateSegmentRequest();
									this.emit("segment-error", this, segmentId, "Segment download is interrupted by a command");
									return;
							}
							this.debug("peer receive command", this.id, command, this);
							switch (command.c) {
									case MediaPeerCommands.SegmentsMap:
											this.segmentsMap = this.createSegmentsMap(command.m);
											this.emit("data-updated");
											break;
									case MediaPeerCommands.SegmentRequest:
											this.emit("segment-request", this, command.i);
											break;
									case MediaPeerCommands.SegmentData:
											if (this.downloadingSegmentId &&
													this.downloadingSegmentId === command.i &&
													typeof command.s === "number" &&
													command.s >= 0) {
													this.downloadingSegment = new DownloadingSegment(command.i, command.s);
													this.emit("segment-start-load", this.downloadingSegment.id);
													this.emit("segment-size", this.downloadingSegment.id, this.downloadingSegment.size);
													this.cancelResponseTimeoutTimer();
											}
											break;
									case MediaPeerCommands.SegmentAbsent:
											if (this.downloadingSegmentId && this.downloadingSegmentId === command.i) {
													this.terminateSegmentRequest();
													this.segmentsMap.delete(command.i);
													this.emit("segment-absent", this, command.i);
											}
											break;
									case MediaPeerCommands.CancelSegmentRequest:
											// TODO: peer stop sending buffer
											break;
									default:
											break;
							}
					};
					this.createSegmentsMap = (segments) => {
							if (!(segments instanceof Object)) {
									return new Map();
							}
							const segmentsMap = new Map();
							for (const streamSwarmId of Object.keys(segments)) {
									const swarmData = segments[streamSwarmId];
									if (!(swarmData instanceof Array) ||
											swarmData.length !== 2 ||
											typeof swarmData[0] !== "string" ||
											!(swarmData[1] instanceof Array)) {
											return new Map();
									}
									const segmentsIds = swarmData[0].split("|");
									const segmentsStatuses = swarmData[1];
									if (segmentsIds.length !== segmentsStatuses.length) {
											return new Map();
									}
									for (let i = 0; i < segmentsIds.length; i++) {
											const segmentStatus = segmentsStatuses[i];
											if (typeof segmentStatus !== "number" || MediaPeerSegmentStatus[segmentStatus] === undefined) {
													return new Map();
											}
											segmentsMap.set(`${streamSwarmId}+${segmentsIds[i]}`, segmentStatus);
									}
							}
							return segmentsMap;
					};
					this.sendCommand = (command) => {
							this.debug("peer send command", this.id, command, this);
							this.peer.write(JSON.stringify(command));
					};
					this.destroy = () => {
							this.debug("peer destroy", this.id, this);
							this.terminateSegmentRequest();
							this.peer.destroy();
					};
					this.getDownloadingSegmentId = () => {
							return this.downloadingSegmentId;
					};
					this.getSegmentsMap = () => {
							return this.segmentsMap;
					};
					this.sendSegmentsMap = (segmentsMap) => {
							this.sendCommand({ c: MediaPeerCommands.SegmentsMap, m: segmentsMap });
					};
					this.sendSegmentData = (segmentId, data) => {
							this.sendCommand({
									c: MediaPeerCommands.SegmentData,
									i: segmentId,
									s: data.byteLength,
							});
							let bytesLeft = data.byteLength;
							while (bytesLeft > 0) {
									const bytesToSend = bytesLeft >= this.settings.webRtcMaxMessageSize ? this.settings.webRtcMaxMessageSize : bytesLeft;
									const buffer = buffer_1.Buffer.from(data, data.byteLength - bytesLeft, bytesToSend);
									this.peer.write(buffer);
									bytesLeft -= bytesToSend;
							}
							this.emit("bytes-uploaded", this, segmentId, data.byteLength);
					};
					this.sendSegmentAbsent = (segmentId) => {
							this.sendCommand({ c: MediaPeerCommands.SegmentAbsent, i: segmentId });
					};
					this.requestSegment = (segmentId) => {
							if (this.downloadingSegmentId) {
									throw new Error("A segment is already downloading: " + this.downloadingSegmentId);
							}
							this.sendCommand({ c: MediaPeerCommands.SegmentRequest, i: segmentId });
							this.downloadingSegmentId = segmentId;
							this.runResponseTimeoutTimer();
					};
					this.cancelSegmentRequest = () => {
							let downloadingSegment;
							if (this.downloadingSegmentId) {
									const segmentId = this.downloadingSegmentId;
									downloadingSegment = this.downloadingSegment ? this.downloadingSegment.pieces : undefined;
									this.terminateSegmentRequest();
									this.sendCommand({ c: MediaPeerCommands.CancelSegmentRequest, i: segmentId });
							}
							return downloadingSegment;
					};
					this.runResponseTimeoutTimer = () => {
							this.timer = setTimeout(() => {
									this.timer = null;
									if (!this.downloadingSegmentId) {
											return;
									}
									const segmentId = this.downloadingSegmentId;
									this.cancelSegmentRequest();
									this.emit("segment-timeout", this, segmentId); // TODO: send peer not responding event
							}, this.settings.p2pSegmentDownloadTimeout);
					};
					this.cancelResponseTimeoutTimer = () => {
							if (this.timer) {
									clearTimeout(this.timer);
									this.timer = null;
							}
					};
					this.terminateSegmentRequest = () => {
							this.downloadingSegmentId = null;
							this.downloadingSegment = null;
							this.cancelResponseTimeoutTimer();
					};
					this.peer.on("connect", this.onPeerConnect);
					this.peer.on("close", this.onPeerClose);
					this.peer.on("error", this.onPeerError);
					this.peer.on("data", this.onPeerData);
					this.id = peer.id;
			}
	}
	exports.MediaPeer = MediaPeer;
	
	},{"./stringly-typed-event-emitter":19,"buffer":"buffer","debug":"debug"}],17:[function(require,module,exports){
	"use strict";
	/**
	 * Copyright 2018 Novage LLC.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	var __importDefault = (this && this.__importDefault) || function (mod) {
			return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.P2PMediaManager = void 0;
	/* eslint-disable @typescript-eslint/no-unsafe-assignment */
	/* eslint-disable @typescript-eslint/no-unsafe-call */
	/* eslint-disable @typescript-eslint/no-unsafe-member-access */
	const debug_1 = __importDefault(require("debug"));
	const client_1 = __importDefault(require("bittorrent-tracker/client"));
	const buffer_1 = require("buffer");
	const sha1_1 = __importDefault(require("sha.js/sha1"));
	const stringly_typed_event_emitter_1 = require("./stringly-typed-event-emitter");
	const media_peer_1 = require("./media-peer");
	const index_1 = require("./index");
	const PEER_PROTOCOL_VERSION = 2;
	const PEER_ID_VERSION_STRING = index_1.version.replace(/\d*./g, (v) => `0${parseInt(v, 10) % 100}`.slice(-2)).slice(0, 4);
	const PEER_ID_VERSION_PREFIX = `-WW${PEER_ID_VERSION_STRING}-`; // Using WebTorrent client ID in order to not be banned by websocket trackers
	class PeerSegmentRequest {
			constructor(peerId, segment) {
					this.peerId = peerId;
					this.segment = segment;
			}
	}
	function generatePeerId() {
			const PEER_ID_SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			const PEER_ID_LENGTH = 20;
			let peerId = PEER_ID_VERSION_PREFIX;
			for (let i = 0; i < PEER_ID_LENGTH - PEER_ID_VERSION_PREFIX.length; i++) {
					peerId += PEER_ID_SYMBOLS.charAt(Math.floor(Math.random() * PEER_ID_SYMBOLS.length));
			}
			return new TextEncoder().encode(peerId).buffer;
	}
	class P2PMediaManager extends stringly_typed_event_emitter_1.STEEmitter {
			constructor(segmentsStorage, settings) {
					super();
					this.segmentsStorage = segmentsStorage;
					this.settings = settings;
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					this.trackerClient = null;
					this.peers = new Map();
					this.peerCandidates = new Map();
					this.peerSegmentRequests = new Map();
					this.streamSwarmId = null;
					this.debug = debug_1.default("p2pml:p2p-media-manager");
					this.pendingTrackerClient = null;
					this.getPeers = () => {
							return this.peers;
					};
					this.getPeerId = () => {
							return buffer_1.Buffer.from(this.peerId).toString("hex");
					};
					this.setStreamSwarmId = (streamSwarmId, masterSwarmId) => {
							if (this.streamSwarmId === streamSwarmId) {
									return;
							}
							this.destroy(true);
							this.streamSwarmId = streamSwarmId;
							this.masterSwarmId = masterSwarmId;
							this.debug("stream swarm ID", this.streamSwarmId);
							this.pendingTrackerClient = {
									isDestroyed: false,
							};
							const pendingTrackerClient = this.pendingTrackerClient;
							// TODO: native browser 'crypto.subtle' implementation doesn't work in Chrome in insecure pages
							// TODO: Edge doesn't support SHA-1. Change to SHA-256 once Edge support is required.
							// const infoHash = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(PEER_PROTOCOL_VERSION + this.streamSwarmId));
							const infoHash = new sha1_1.default().update(`${PEER_PROTOCOL_VERSION}${this.streamSwarmId}`).digest();
							// destroy may be called while waiting for the hash to be calculated
							if (!pendingTrackerClient.isDestroyed) {
									this.pendingTrackerClient = null;
									this.createClient(infoHash);
							}
							else if (this.trackerClient !== null) {
									this.trackerClient.destroy();
									this.trackerClient = null;
							}
					};
					this.createClient = (infoHash) => {
							if (!this.settings.useP2P) {
									return;
							}
							const clientOptions = {
									infoHash: buffer_1.Buffer.from(infoHash, 0, 20),
									peerId: buffer_1.Buffer.from(this.peerId, 0, 20),
									announce: this.settings.trackerAnnounce,
									rtcConfig: this.settings.rtcConfig,
									port: 6881,
									getAnnounceOpts: () => {
											return { numwant: this.settings.peerRequestsPerAnnounce };
									},
							};
							let oldTrackerClient = this.trackerClient;
							this.trackerClient = new client_1.default(clientOptions);
							this.trackerClient.on("error", this.onTrackerError);
							this.trackerClient.on("warning", this.onTrackerWarning);
							this.trackerClient.on("update", this.onTrackerUpdate);
							this.trackerClient.on("peer", this.onTrackerPeer);
							this.trackerClient.start();
							if (oldTrackerClient !== null) {
									oldTrackerClient.destroy();
									oldTrackerClient = null;
							}
					};
					this.onTrackerError = (error) => {
							this.debug("tracker error", error);
					};
					this.onTrackerWarning = (warning) => {
							this.debug("tracker warning", warning);
					};
					this.onTrackerUpdate = (data) => {
							this.debug("tracker update", data);
							this.emit("tracker-update", data);
					};
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					this.onTrackerPeer = (trackerPeer) => {
							this.debug("tracker peer", trackerPeer.id, trackerPeer);
							if (this.peers.has(trackerPeer.id)) {
									this.debug("tracker peer already connected", trackerPeer.id, trackerPeer);
									trackerPeer.destroy();
									return;
							}
							const peer = new media_peer_1.MediaPeer(trackerPeer, this.settings);
							peer.on("connect", this.onPeerConnect);
							peer.on("close", this.onPeerClose);
							peer.on("data-updated", this.onPeerDataUpdated);
							peer.on("segment-request", this.onSegmentRequest);
							peer.on("segment-loaded", this.onSegmentLoaded);
							peer.on("segment-absent", this.onSegmentAbsent);
							peer.on("segment-error", this.onSegmentError);
							peer.on("segment-size", this.onSegmentSize);
							peer.on("segment-start-load", this.onSegmentStartLoad);
							peer.on("segment-timeout", this.onSegmentTimeout);
							peer.on("bytes-downloaded", this.onPieceBytesDownloaded);
							peer.on("bytes-uploaded", this.onPieceBytesUploaded);
							let peerCandidatesById = this.peerCandidates.get(peer.id);
							if (!peerCandidatesById) {
									peerCandidatesById = [];
									this.peerCandidates.set(peer.id, peerCandidatesById);
							}
							peerCandidatesById.push(peer);
					};
					this.download = (segment) => {
							if (this.isDownloading(segment)) {
									return false;
							}
							const candidates = [];
							for (const peer of this.peers.values()) {
									if (peer.getDownloadingSegmentId() === null &&
											peer.getSegmentsMap().get(segment.id) === media_peer_1.MediaPeerSegmentStatus.Loaded) {
											candidates.push(peer);
									}
							}
							if (candidates.length === 0) {
									return false;
							}
							const peer = candidates[Math.floor(Math.random() * candidates.length)];
							peer.requestSegment(segment.id);
							this.peerSegmentRequests.set(segment.id, new PeerSegmentRequest(peer.id, segment));
							return true;
					};
					this.abort = (segment) => {
							let downloadingSegment;
							const peerSegmentRequest = this.peerSegmentRequests.get(segment.id);
							if (peerSegmentRequest) {
									const peer = this.peers.get(peerSegmentRequest.peerId);
									if (peer) {
											downloadingSegment = peer.cancelSegmentRequest();
									}
									this.peerSegmentRequests.delete(segment.id);
							}
							return downloadingSegment;
					};
					this.isDownloading = (segment) => {
							return this.peerSegmentRequests.has(segment.id);
					};
					this.getActiveDownloadsCount = () => {
							return this.peerSegmentRequests.size;
					};
					this.destroy = (swarmChange = false) => {
							this.streamSwarmId = null;
							if (this.trackerClient) {
									this.trackerClient.stop();
									if (swarmChange) {
											// Don't destroy trackerClient to reuse its WebSocket connection to the tracker server
											this.trackerClient.removeAllListeners("error");
											this.trackerClient.removeAllListeners("warning");
											this.trackerClient.removeAllListeners("update");
											this.trackerClient.removeAllListeners("peer");
									}
									else {
											this.trackerClient.destroy();
											this.trackerClient = null;
									}
							}
							if (this.pendingTrackerClient) {
									this.pendingTrackerClient.isDestroyed = true;
									this.pendingTrackerClient = null;
							}
							this.peers.forEach((peer) => peer.destroy());
							this.peers.clear();
							this.peerSegmentRequests.clear();
							for (const peerCandidateById of this.peerCandidates.values()) {
									for (const peerCandidate of peerCandidateById) {
											peerCandidate.destroy();
									}
							}
							this.peerCandidates.clear();
					};
					this.sendSegmentsMapToAll = (segmentsMap) => {
							this.peers.forEach((peer) => peer.sendSegmentsMap(segmentsMap));
					};
					this.sendSegmentsMap = (peerId, segmentsMap) => {
							const peer = this.peers.get(peerId);
							if (peer) {
									peer.sendSegmentsMap(segmentsMap);
							}
					};
					this.getOverallSegmentsMap = () => {
							const overallSegmentsMap = new Map();
							for (const peer of this.peers.values()) {
									for (const [segmentId, segmentStatus] of peer.getSegmentsMap()) {
											if (segmentStatus === media_peer_1.MediaPeerSegmentStatus.Loaded) {
													overallSegmentsMap.set(segmentId, media_peer_1.MediaPeerSegmentStatus.Loaded);
											}
											else if (!overallSegmentsMap.get(segmentId)) {
													overallSegmentsMap.set(segmentId, media_peer_1.MediaPeerSegmentStatus.LoadingByHttp);
											}
									}
							}
							return overallSegmentsMap;
					};
					this.onPieceBytesDownloaded = (peer, segmentId, bytes) => {
							const peerSegmentRequest = this.peerSegmentRequests.get(segmentId);
							if (peerSegmentRequest) {
									this.emit("bytes-downloaded", peerSegmentRequest.segment, bytes, peer.id);
							}
					};
					this.onPieceBytesUploaded = async (peer, segmentId, bytes) => {
							if (this.masterSwarmId === undefined) {
									return;
							}
							const segment = await this.segmentsStorage.getSegment(segmentId, this.masterSwarmId);
							if (segment) {
									this.emit("bytes-uploaded", segment, bytes, peer.id);
							}
					};
					this.onPeerConnect = (peer) => {
							const connectedPeer = this.peers.get(peer.id);
							if (connectedPeer) {
									this.debug("tracker peer already connected (in peer connect)", peer.id, peer);
									peer.destroy();
									return;
							}
							// First peer with the ID connected
							this.peers.set(peer.id, peer);
							// Destroy all other peer candidates
							const peerCandidatesById = this.peerCandidates.get(peer.id);
							if (peerCandidatesById) {
									for (const peerCandidate of peerCandidatesById) {
											if (peerCandidate !== peer) {
													peerCandidate.destroy();
											}
									}
									this.peerCandidates.delete(peer.id);
							}
							this.emit("peer-connected", { id: peer.id, remoteAddress: peer.remoteAddress });
					};
					this.onPeerClose = (peer) => {
							if (this.peers.get(peer.id) !== peer) {
									// Try to delete the peer candidate
									const peerCandidatesById = this.peerCandidates.get(peer.id);
									if (!peerCandidatesById) {
											return;
									}
									const index = peerCandidatesById.indexOf(peer);
									if (index !== -1) {
											peerCandidatesById.splice(index, 1);
									}
									if (peerCandidatesById.length === 0) {
											this.peerCandidates.delete(peer.id);
									}
									return;
							}
							for (const [key, value] of this.peerSegmentRequests) {
									if (value.peerId === peer.id) {
											this.peerSegmentRequests.delete(key);
									}
							}
							this.peers.delete(peer.id);
							this.emit("peer-data-updated");
							this.emit("peer-closed", peer.id);
					};
					this.onPeerDataUpdated = () => {
							this.emit("peer-data-updated");
					};
					this.onSegmentRequest = async (peer, segmentId) => {
							if (this.masterSwarmId === undefined) {
									return;
							}
							const segment = await this.segmentsStorage.getSegment(segmentId, this.masterSwarmId);
							if (segment && segment.data) {
									peer.sendSegmentData(segmentId, segment.data);
							}
							else {
									peer.sendSegmentAbsent(segmentId);
							}
					};
					this.onSegmentLoaded = async (peer, segmentId, data) => {
							const peerSegmentRequest = this.peerSegmentRequests.get(segmentId);
							if (!peerSegmentRequest) {
									return;
							}
							const segment = peerSegmentRequest.segment;
							if (this.settings.segmentValidator) {
									try {
											await this.settings.segmentValidator(Object.assign(Object.assign({}, segment), { data: data }), "p2p", peer.id);
									}
									catch (error) {
											this.debug("segment validator failed", error);
											this.peerSegmentRequests.delete(segmentId);
											this.emit("segment-error", segment, error, peer.id);
											this.onPeerClose(peer);
											return;
									}
							}
							this.peerSegmentRequests.delete(segmentId);
							this.emit("segment-loaded", segment, data, peer.id);
					};
					this.onSegmentAbsent = (peer, segmentId) => {
							this.peerSegmentRequests.delete(segmentId);
							this.emit("peer-data-updated");
					};
					this.onSegmentError = (peer, segmentId, description) => {
							const peerSegmentRequest = this.peerSegmentRequests.get(segmentId);
							if (peerSegmentRequest) {
									this.peerSegmentRequests.delete(segmentId);
									this.emit("segment-error", peerSegmentRequest.segment, description, peer.id);
							}
					};
					this.onSegmentSize = (segmentId, size) => {
							const peerSegmentRequest = this.peerSegmentRequests.get(segmentId);
							if (peerSegmentRequest) {
									this.emit("segment-size", peerSegmentRequest.segment, size);
							}
					};
					this.onSegmentStartLoad = (segmentId, size) => {
							const peerSegmentRequest = this.peerSegmentRequests.get(segmentId);
							if (peerSegmentRequest) {
									this.emit("segment-start-load", peerSegmentRequest.segment, size);
							}
					};
					this.onSegmentTimeout = (peer, segmentId) => {
							const peerSegmentRequest = this.peerSegmentRequests.get(segmentId);
							if (peerSegmentRequest) {
									this.peerSegmentRequests.delete(segmentId);
									peer.destroy();
									if (this.peers.delete(peerSegmentRequest.peerId)) {
											this.emit("peer-data-updated");
									}
							}
					};
					this.peerId = settings.useP2P ? generatePeerId() : new ArrayBuffer(0);
					if (this.debug.enabled) {
							this.debug("peer ID", this.getPeerId(), new TextDecoder().decode(this.peerId));
					}
			}
	}
	exports.P2PMediaManager = P2PMediaManager;
	
	},{"./index":14,"./media-peer":16,"./stringly-typed-event-emitter":19,"bittorrent-tracker/client":22,"buffer":"buffer","debug":"debug","sha.js/sha1":55}],18:[function(require,module,exports){
	"use strict";
	/**
	 * Copyright 2019 Novage LLC.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SegmentsMemoryStorage = void 0;
	class SegmentsMemoryStorage {
			constructor(settings) {
					this.settings = settings;
					this.cache = new Map();
					this.storeSegment = async (segment) => {
							this.cache.set(segment.id, { segment, lastAccessed: performance.now() });
					};
					this.getSegmentsMap = async () => {
							return this.cache;
					};
					this.getSegment = async (id) => {
							const cacheItem = this.cache.get(id);
							if (cacheItem === undefined) {
									return undefined;
							}
							cacheItem.lastAccessed = performance.now();
							return cacheItem.segment;
					};
					this.hasSegment = async (id) => {
							return this.cache.has(id);
					};
					this.clean = async (masterSwarmId, lockedSegmentsFilter) => {
							const segmentsToDelete = [];
							const remainingSegments = [];
							// Delete old segments
							const now = performance.now();
							for (const cachedSegment of this.cache.values()) {
									if (now - cachedSegment.lastAccessed > this.settings.cachedSegmentExpiration) {
											segmentsToDelete.push(cachedSegment.segment.id);
									}
									else {
											remainingSegments.push(cachedSegment);
									}
							}
							// Delete segments over cached count
							let countOverhead = remainingSegments.length - this.settings.cachedSegmentsCount;
							if (countOverhead > 0) {
									remainingSegments.sort((a, b) => a.lastAccessed - b.lastAccessed);
									for (const cachedSegment of remainingSegments) {
											if (lockedSegmentsFilter === undefined || !lockedSegmentsFilter(cachedSegment.segment.id)) {
													segmentsToDelete.push(cachedSegment.segment.id);
													countOverhead--;
													if (countOverhead === 0) {
															break;
													}
											}
									}
							}
							segmentsToDelete.forEach((id) => this.cache.delete(id));
							return segmentsToDelete.length > 0;
					};
					this.destroy = async () => {
							this.cache.clear();
					};
			}
	}
	exports.SegmentsMemoryStorage = SegmentsMemoryStorage;
	
	},{}],19:[function(require,module,exports){
	"use strict";
	/**
	 * Copyright 2018 Novage LLC.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.STEEmitter = void 0;
	/* eslint-disable @typescript-eslint/no-explicit-any */
	const events_1 = require("events");
	class STEEmitter extends events_1.EventEmitter {
			constructor() {
					super(...arguments);
					this.on = (event, listener) => super.on(event, listener);
					this.emit = (event, ...args) => super.emit(event, ...args);
			}
	}
	exports.STEEmitter = STEEmitter;
	
	},{"events":"events"}],20:[function(require,module,exports){
	(function (Buffer){(function (){
	"use strict";
	
	var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = decodeB64ToUint8Array;
	
	var _window = _interopRequireDefault(require("global/window"));
	
	var atob = function atob(s) {
		return _window.default.atob ? _window.default.atob(s) : Buffer.from(s, 'base64').toString('binary');
	};
	
	function decodeB64ToUint8Array(b64Text) {
		var decodedString = atob(b64Text);
		var array = new Uint8Array(decodedString.length);
	
		for (var i = 0; i < decodedString.length; i++) {
			array[i] = decodedString.charCodeAt(i);
		}
	
		return array;
	}
	
	module.exports = exports.default;
	}).call(this)}).call(this,require("buffer").Buffer)
	},{"@babel/runtime/helpers/interopRequireDefault":9,"buffer":"buffer","global/window":30}],21:[function(require,module,exports){
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = void 0;
	
	/**
	 * @file stream.js
	 */
	
	/**
	 * A lightweight readable stream implemention that handles event dispatching.
	 *
	 * @class Stream
	 */
	var Stream = /*#__PURE__*/function () {
		function Stream() {
			this.listeners = {};
		}
		/**
		 * Add a listener for a specified event type.
		 *
		 * @param {string} type the event name
		 * @param {Function} listener the callback to be invoked when an event of
		 * the specified type occurs
		 */
	
	
		var _proto = Stream.prototype;
	
		_proto.on = function on(type, listener) {
			if (!this.listeners[type]) {
				this.listeners[type] = [];
			}
	
			this.listeners[type].push(listener);
		}
		/**
		 * Remove a listener for a specified event type.
		 *
		 * @param {string} type the event name
		 * @param {Function} listener  a function previously registered for this
		 * type of event through `on`
		 * @return {boolean} if we could turn it off or not
		 */
		;
	
		_proto.off = function off(type, listener) {
			if (!this.listeners[type]) {
				return false;
			}
	
			var index = this.listeners[type].indexOf(listener); // TODO: which is better?
			// In Video.js we slice listener functions
			// on trigger so that it does not mess up the order
			// while we loop through.
			//
			// Here we slice on off so that the loop in trigger
			// can continue using it's old reference to loop without
			// messing up the order.
	
			this.listeners[type] = this.listeners[type].slice(0);
			this.listeners[type].splice(index, 1);
			return index > -1;
		}
		/**
		 * Trigger an event of the specified type on this stream. Any additional
		 * arguments to this function are passed as parameters to event listeners.
		 *
		 * @param {string} type the event name
		 */
		;
	
		_proto.trigger = function trigger(type) {
			var callbacks = this.listeners[type];
	
			if (!callbacks) {
				return;
			} // Slicing the arguments on every invocation of this method
			// can add a significant amount of overhead. Avoid the
			// intermediate object creation for the common case of a
			// single callback argument
	
	
			if (arguments.length === 2) {
				var length = callbacks.length;
	
				for (var i = 0; i < length; ++i) {
					callbacks[i].call(this, arguments[1]);
				}
			} else {
				var args = Array.prototype.slice.call(arguments, 1);
				var _length = callbacks.length;
	
				for (var _i = 0; _i < _length; ++_i) {
					callbacks[_i].apply(this, args);
				}
			}
		}
		/**
		 * Destroys the stream and cleans up.
		 */
		;
	
		_proto.dispose = function dispose() {
			this.listeners = {};
		}
		/**
		 * Forwards all `data` events on this stream to the destination stream. The
		 * destination stream should provide a method `push` to receive the data
		 * events as they arrive.
		 *
		 * @param {Stream} destination the stream that will receive all `data` events
		 * @see http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
		 */
		;
	
		_proto.pipe = function pipe(destination) {
			this.on('data', function (data) {
				destination.push(data);
			});
		};
	
		return Stream;
	}();
	
	exports.default = Stream;
	module.exports = exports.default;
	},{}],22:[function(require,module,exports){
	(function (process,Buffer){(function (){
	const debug = require('debug')('bittorrent-tracker:client')
	const EventEmitter = require('events')
	const once = require('once')
	const parallel = require('run-parallel')
	const Peer = require('simple-peer')
	const queueMicrotask = require('queue-microtask')
	
	const common = require('./lib/common')
	const HTTPTracker = require('./lib/client/http-tracker') // empty object in browser
	const UDPTracker = require('./lib/client/udp-tracker') // empty object in browser
	const WebSocketTracker = require('./lib/client/websocket-tracker')
	
	/**
	 * BitTorrent tracker client.
	 *
	 * Find torrent peers, to help a torrent client participate in a torrent swarm.
	 *
	 * @param {Object} opts                          options object
	 * @param {string|Buffer} opts.infoHash          torrent info hash
	 * @param {string|Buffer} opts.peerId            peer id
	 * @param {string|Array.<string>} opts.announce  announce
	 * @param {number} opts.port                     torrent client listening port
	 * @param {function} opts.getAnnounceOpts        callback to provide data to tracker
	 * @param {number} opts.rtcConfig                RTCPeerConnection configuration object
	 * @param {number} opts.userAgent                User-Agent header for http requests
	 * @param {number} opts.wrtc                     custom webrtc impl (useful in node.js)
	 * @param {object} opts.proxyOpts                proxy options (useful in node.js)
	 */
	class Client extends EventEmitter {
		constructor (opts = {}) {
			super()
	
			if (!opts.peerId) throw new Error('Option `peerId` is required')
			if (!opts.infoHash) throw new Error('Option `infoHash` is required')
			if (!opts.announce) throw new Error('Option `announce` is required')
			if (!process.browser && !opts.port) throw new Error('Option `port` is required')
	
			this.peerId = typeof opts.peerId === 'string'
				? opts.peerId
				: opts.peerId.toString('hex')
			this._peerIdBuffer = Buffer.from(this.peerId, 'hex')
			this._peerIdBinary = this._peerIdBuffer.toString('binary')
	
			this.infoHash = typeof opts.infoHash === 'string'
				? opts.infoHash.toLowerCase()
				: opts.infoHash.toString('hex')
			this._infoHashBuffer = Buffer.from(this.infoHash, 'hex')
			this._infoHashBinary = this._infoHashBuffer.toString('binary')
	
			debug('new client %s', this.infoHash)
	
			this.destroyed = false
	
			this._port = opts.port
			this._getAnnounceOpts = opts.getAnnounceOpts
			this._rtcConfig = opts.rtcConfig
			this._userAgent = opts.userAgent
			this._proxyOpts = opts.proxyOpts
	
			// Support lazy 'wrtc' module initialization
			// See: https://github.com/webtorrent/webtorrent-hybrid/issues/46
			this._wrtc = typeof opts.wrtc === 'function' ? opts.wrtc() : opts.wrtc
	
			let announce = typeof opts.announce === 'string'
				? [opts.announce]
				: opts.announce == null ? [] : opts.announce
	
			// Remove trailing slash from trackers to catch duplicates
			announce = announce.map(announceUrl => {
				announceUrl = announceUrl.toString()
				if (announceUrl[announceUrl.length - 1] === '/') {
					announceUrl = announceUrl.substring(0, announceUrl.length - 1)
				}
				return announceUrl
			})
			// remove duplicates by converting to Set and back
			announce = Array.from(new Set(announce))
	
			const webrtcSupport = this._wrtc !== false && (!!this._wrtc || Peer.WEBRTC_SUPPORT)
	
			const nextTickWarn = err => {
				queueMicrotask(() => {
					this.emit('warning', err)
				})
			}
	
			this._trackers = announce
				.map(announceUrl => {
					let parsedUrl
					try {
						parsedUrl = common.parseUrl(announceUrl)
					} catch (err) {
						nextTickWarn(new Error(`Invalid tracker URL: ${announceUrl}`))
						return null
					}
	
					const port = parsedUrl.port
					if (port < 0 || port > 65535) {
						nextTickWarn(new Error(`Invalid tracker port: ${announceUrl}`))
						return null
					}
	
					const protocol = parsedUrl.protocol
					if ((protocol === 'http:' || protocol === 'https:') &&
							typeof HTTPTracker === 'function') {
						return new HTTPTracker(this, announceUrl)
					} else if (protocol === 'udp:' && typeof UDPTracker === 'function') {
						return new UDPTracker(this, announceUrl)
					} else if ((protocol === 'ws:' || protocol === 'wss:') && webrtcSupport) {
						// Skip ws:// trackers on https:// sites because they throw SecurityError
						if (protocol === 'ws:' && typeof window !== 'undefined' &&
								window.location.protocol === 'https:') {
							nextTickWarn(new Error(`Unsupported tracker protocol: ${announceUrl}`))
							return null
						}
						return new WebSocketTracker(this, announceUrl)
					} else {
						nextTickWarn(new Error(`Unsupported tracker protocol: ${announceUrl}`))
						return null
					}
				})
				.filter(Boolean)
		}
	
		/**
		 * Send a `start` announce to the trackers.
		 * @param {Object} opts
		 * @param {number=} opts.uploaded
		 * @param {number=} opts.downloaded
		 * @param {number=} opts.left (if not set, calculated automatically)
		 */
		start (opts) {
			opts = this._defaultAnnounceOpts(opts)
			opts.event = 'started'
			debug('send `start` %o', opts)
			this._announce(opts)
	
			// start announcing on intervals
			this._trackers.forEach(tracker => {
				tracker.setInterval()
			})
		}
	
		/**
		 * Send a `stop` announce to the trackers.
		 * @param {Object} opts
		 * @param {number=} opts.uploaded
		 * @param {number=} opts.downloaded
		 * @param {number=} opts.numwant
		 * @param {number=} opts.left (if not set, calculated automatically)
		 */
		stop (opts) {
			opts = this._defaultAnnounceOpts(opts)
			opts.event = 'stopped'
			debug('send `stop` %o', opts)
			this._announce(opts)
		}
	
		/**
		 * Send a `complete` announce to the trackers.
		 * @param {Object} opts
		 * @param {number=} opts.uploaded
		 * @param {number=} opts.downloaded
		 * @param {number=} opts.numwant
		 * @param {number=} opts.left (if not set, calculated automatically)
		 */
		complete (opts) {
			if (!opts) opts = {}
			opts = this._defaultAnnounceOpts(opts)
			opts.event = 'completed'
			debug('send `complete` %o', opts)
			this._announce(opts)
		}
	
		/**
		 * Send a `update` announce to the trackers.
		 * @param {Object} opts
		 * @param {number=} opts.uploaded
		 * @param {number=} opts.downloaded
		 * @param {number=} opts.numwant
		 * @param {number=} opts.left (if not set, calculated automatically)
		 */
		update (opts) {
			opts = this._defaultAnnounceOpts(opts)
			if (opts.event) delete opts.event
			debug('send `update` %o', opts)
			this._announce(opts)
		}
	
		_announce (opts) {
			this._trackers.forEach(tracker => {
				// tracker should not modify `opts` object, it's passed to all trackers
				tracker.announce(opts)
			})
		}
	
		/**
		 * Send a scrape request to the trackers.
		 * @param {Object} opts
		 */
		scrape (opts) {
			debug('send `scrape`')
			if (!opts) opts = {}
			this._trackers.forEach(tracker => {
				// tracker should not modify `opts` object, it's passed to all trackers
				tracker.scrape(opts)
			})
		}
	
		setInterval (intervalMs) {
			debug('setInterval %d', intervalMs)
			this._trackers.forEach(tracker => {
				tracker.setInterval(intervalMs)
			})
		}
	
		destroy (cb) {
			if (this.destroyed) return
			this.destroyed = true
			debug('destroy')
	
			const tasks = this._trackers.map(tracker => cb => {
				tracker.destroy(cb)
			})
	
			parallel(tasks, cb)
	
			this._trackers = []
			this._getAnnounceOpts = null
		}
	
		_defaultAnnounceOpts (opts = {}) {
			if (opts.numwant == null) opts.numwant = common.DEFAULT_ANNOUNCE_PEERS
	
			if (opts.uploaded == null) opts.uploaded = 0
			if (opts.downloaded == null) opts.downloaded = 0
	
			if (this._getAnnounceOpts) opts = Object.assign({}, opts, this._getAnnounceOpts())
	
			return opts
		}
	}
	
	/**
	 * Simple convenience function to scrape a tracker for an info hash without needing to
	 * create a Client, pass it a parsed torrent, etc. Support scraping a tracker for multiple
	 * torrents at the same time.
	 * @params {Object} opts
	 * @param  {string|Array.<string>} opts.infoHash
	 * @param  {string} opts.announce
	 * @param  {function} cb
	 */
	Client.scrape = (opts, cb) => {
		cb = once(cb)
	
		if (!opts.infoHash) throw new Error('Option `infoHash` is required')
		if (!opts.announce) throw new Error('Option `announce` is required')
	
		const clientOpts = Object.assign({}, opts, {
			infoHash: Array.isArray(opts.infoHash) ? opts.infoHash[0] : opts.infoHash,
			peerId: Buffer.from('01234567890123456789'), // dummy value
			port: 6881 // dummy value
		})
	
		const client = new Client(clientOpts)
		client.once('error', cb)
		client.once('warning', cb)
	
		let len = Array.isArray(opts.infoHash) ? opts.infoHash.length : 1
		const results = {}
		client.on('scrape', data => {
			len -= 1
			results[data.infoHash] = data
			if (len === 0) {
				client.destroy()
				const keys = Object.keys(results)
				if (keys.length === 1) {
					cb(null, results[keys[0]])
				} else {
					cb(null, results)
				}
			}
		})
	
		opts.infoHash = Array.isArray(opts.infoHash)
			? opts.infoHash.map(infoHash => Buffer.from(infoHash, 'hex'))
			: Buffer.from(opts.infoHash, 'hex')
		client.scrape({ infoHash: opts.infoHash })
		return client
	}
	
	module.exports = Client
	
	}).call(this)}).call(this,require('_process'),require("buffer").Buffer)
	},{"./lib/client/http-tracker":26,"./lib/client/udp-tracker":26,"./lib/client/websocket-tracker":24,"./lib/common":25,"_process":34,"buffer":"buffer","debug":"debug","events":"events","once":33,"queue-microtask":35,"run-parallel":52,"simple-peer":56}],23:[function(require,module,exports){
	const EventEmitter = require('events')
	
	class Tracker extends EventEmitter {
		constructor (client, announceUrl) {
			super()
	
			this.client = client
			this.announceUrl = announceUrl
	
			this.interval = null
			this.destroyed = false
		}
	
		setInterval (intervalMs) {
			if (intervalMs == null) intervalMs = this.DEFAULT_ANNOUNCE_INTERVAL
	
			clearInterval(this.interval)
	
			if (intervalMs) {
				this.interval = setInterval(() => {
					this.announce(this.client._defaultAnnounceOpts())
				}, intervalMs)
				if (this.interval.unref) this.interval.unref()
			}
		}
	}
	
	module.exports = Tracker
	
	},{"events":"events"}],24:[function(require,module,exports){
	const clone = require('clone')
	const debug = require('debug')('bittorrent-tracker:websocket-tracker')
	const Peer = require('simple-peer')
	const randombytes = require('randombytes')
	const Socket = require('simple-websocket')
	const Socks = require('socks')
	
	const common = require('../common')
	const Tracker = require('./tracker')
	
	// Use a socket pool, so tracker clients share WebSocket objects for the same server.
	// In practice, WebSockets are pretty slow to establish, so this gives a nice performance
	// boost, and saves browser resources.
	const socketPool = {}
	
	const RECONNECT_MINIMUM = 10 * 1000
	const RECONNECT_MAXIMUM = 60 * 60 * 1000
	const RECONNECT_VARIANCE = 5 * 60 * 1000
	const OFFER_TIMEOUT = 50 * 1000
	
	class WebSocketTracker extends Tracker {
		constructor (client, announceUrl) {
			super(client, announceUrl)
			debug('new websocket tracker %s', announceUrl)
	
			this.peers = {} // peers (offer id -> peer)
			this.socket = null
	
			this.reconnecting = false
			this.retries = 0
			this.reconnectTimer = null
	
			// Simple boolean flag to track whether the socket has received data from
			// the websocket server since the last time socket.send() was called.
			this.expectingResponse = false
	
			this._openSocket()
		}
	
		announce (opts) {
			if (this.destroyed || this.reconnecting) return
			if (!this.socket.connected) {
				this.socket.once('connect', () => {
					this.announce(opts)
				})
				return
			}
	
			const params = Object.assign({}, opts, {
				action: 'announce',
				info_hash: this.client._infoHashBinary,
				peer_id: this.client._peerIdBinary
			})
			if (this._trackerId) params.trackerid = this._trackerId
	
			if (opts.event === 'stopped' || opts.event === 'completed') {
				// Don't include offers with 'stopped' or 'completed' event
				this._send(params)
			} else {
				// Limit the number of offers that are generated, since it can be slow
				const numwant = Math.min(opts.numwant, 5)
	
				this._generateOffers(numwant, offers => {
					params.numwant = numwant
					params.offers = offers
					this._send(params)
				})
			}
		}
	
		scrape (opts) {
			if (this.destroyed || this.reconnecting) return
			if (!this.socket.connected) {
				this.socket.once('connect', () => {
					this.scrape(opts)
				})
				return
			}
	
			const infoHashes = (Array.isArray(opts.infoHash) && opts.infoHash.length > 0)
				? opts.infoHash.map(infoHash => infoHash.toString('binary'))
				: (opts.infoHash && opts.infoHash.toString('binary')) || this.client._infoHashBinary
			const params = {
				action: 'scrape',
				info_hash: infoHashes
			}
	
			this._send(params)
		}
	
		destroy (cb = noop) {
			if (this.destroyed) return cb(null)
	
			this.destroyed = true
	
			clearInterval(this.interval)
			clearTimeout(this.reconnectTimer)
	
			// Destroy peers
			for (const peerId in this.peers) {
				const peer = this.peers[peerId]
				clearTimeout(peer.trackerTimeout)
				peer.destroy()
			}
			this.peers = null
	
			if (this.socket) {
				this.socket.removeListener('connect', this._onSocketConnectBound)
				this.socket.removeListener('data', this._onSocketDataBound)
				this.socket.removeListener('close', this._onSocketCloseBound)
				this.socket.removeListener('error', this._onSocketErrorBound)
				this.socket = null
			}
	
			this._onSocketConnectBound = null
			this._onSocketErrorBound = null
			this._onSocketDataBound = null
			this._onSocketCloseBound = null
	
			if (socketPool[this.announceUrl]) {
				socketPool[this.announceUrl].consumers -= 1
			}
	
			// Other instances are using the socket, so there's nothing left to do here
			if (socketPool[this.announceUrl].consumers > 0) return cb()
	
			let socket = socketPool[this.announceUrl]
			delete socketPool[this.announceUrl]
			socket.on('error', noop) // ignore all future errors
			socket.once('close', cb)
	
			let timeout
	
			// If there is no data response expected, destroy immediately.
			if (!this.expectingResponse) return destroyCleanup()
	
			// Otherwise, wait a short time for potential responses to come in from the
			// server, then force close the socket.
			timeout = setTimeout(destroyCleanup, common.DESTROY_TIMEOUT)
	
			// But, if a response comes from the server before the timeout fires, do cleanup
			// right away.
			socket.once('data', destroyCleanup)
	
			function destroyCleanup () {
				if (timeout) {
					clearTimeout(timeout)
					timeout = null
				}
				socket.removeListener('data', destroyCleanup)
				socket.destroy()
				socket = null
			}
		}
	
		_openSocket () {
			this.destroyed = false
	
			if (!this.peers) this.peers = {}
	
			this._onSocketConnectBound = () => {
				this._onSocketConnect()
			}
			this._onSocketErrorBound = err => {
				this._onSocketError(err)
			}
			this._onSocketDataBound = data => {
				this._onSocketData(data)
			}
			this._onSocketCloseBound = () => {
				this._onSocketClose()
			}
	
			this.socket = socketPool[this.announceUrl]
			if (this.socket) {
				socketPool[this.announceUrl].consumers += 1
				if (this.socket.connected) {
					this._onSocketConnectBound()
				}
			} else {
				const parsedUrl = new URL(this.announceUrl)
				let agent
				if (this.client._proxyOpts) {
					agent = parsedUrl.protocol === 'wss:' ? this.client._proxyOpts.httpsAgent : this.client._proxyOpts.httpAgent
					if (!agent && this.client._proxyOpts.socksProxy) {
						agent = new Socks.Agent(clone(this.client._proxyOpts.socksProxy), (parsedUrl.protocol === 'wss:'))
					}
				}
				this.socket = socketPool[this.announceUrl] = new Socket({ url: this.announceUrl, agent: agent })
				this.socket.consumers = 1
				this.socket.once('connect', this._onSocketConnectBound)
			}
	
			this.socket.on('data', this._onSocketDataBound)
			this.socket.once('close', this._onSocketCloseBound)
			this.socket.once('error', this._onSocketErrorBound)
		}
	
		_onSocketConnect () {
			if (this.destroyed) return
	
			if (this.reconnecting) {
				this.reconnecting = false
				this.retries = 0
				this.announce(this.client._defaultAnnounceOpts())
			}
		}
	
		_onSocketData (data) {
			if (this.destroyed) return
	
			this.expectingResponse = false
	
			try {
				data = JSON.parse(data)
			} catch (err) {
				this.client.emit('warning', new Error('Invalid tracker response'))
				return
			}
	
			if (data.action === 'announce') {
				this._onAnnounceResponse(data)
			} else if (data.action === 'scrape') {
				this._onScrapeResponse(data)
			} else {
				this._onSocketError(new Error(`invalid action in WS response: ${data.action}`))
			}
		}
	
		_onAnnounceResponse (data) {
			if (data.info_hash !== this.client._infoHashBinary) {
				debug(
					'ignoring websocket data from %s for %s (looking for %s: reused socket)',
					this.announceUrl, common.binaryToHex(data.info_hash), this.client.infoHash
				)
				return
			}
	
			if (data.peer_id && data.peer_id === this.client._peerIdBinary) {
				// ignore offers/answers from this client
				return
			}
	
			debug(
				'received %s from %s for %s',
				JSON.stringify(data), this.announceUrl, this.client.infoHash
			)
	
			const failure = data['failure reason']
			if (failure) return this.client.emit('warning', new Error(failure))
	
			const warning = data['warning message']
			if (warning) this.client.emit('warning', new Error(warning))
	
			const interval = data.interval || data['min interval']
			if (interval) this.setInterval(interval * 1000)
	
			const trackerId = data['tracker id']
			if (trackerId) {
				// If absent, do not discard previous trackerId value
				this._trackerId = trackerId
			}
	
			if (data.complete != null) {
				const response = Object.assign({}, data, {
					announce: this.announceUrl,
					infoHash: common.binaryToHex(data.info_hash)
				})
				this.client.emit('update', response)
			}
	
			let peer
			if (data.offer && data.peer_id) {
				debug('creating peer (from remote offer)')
				peer = this._createPeer()
				peer.id = common.binaryToHex(data.peer_id)
				peer.once('signal', answer => {
					const params = {
						action: 'announce',
						info_hash: this.client._infoHashBinary,
						peer_id: this.client._peerIdBinary,
						to_peer_id: data.peer_id,
						answer,
						offer_id: data.offer_id
					}
					if (this._trackerId) params.trackerid = this._trackerId
					this._send(params)
				})
				this.client.emit('peer', peer)
				peer.signal(data.offer)
			}
	
			if (data.answer && data.peer_id) {
				const offerId = common.binaryToHex(data.offer_id)
				peer = this.peers[offerId]
				if (peer) {
					peer.id = common.binaryToHex(data.peer_id)
					this.client.emit('peer', peer)
					peer.signal(data.answer)
	
					clearTimeout(peer.trackerTimeout)
					peer.trackerTimeout = null
					delete this.peers[offerId]
				} else {
					debug(`got unexpected answer: ${JSON.stringify(data.answer)}`)
				}
			}
		}
	
		_onScrapeResponse (data) {
			data = data.files || {}
	
			const keys = Object.keys(data)
			if (keys.length === 0) {
				this.client.emit('warning', new Error('invalid scrape response'))
				return
			}
	
			keys.forEach(infoHash => {
				// TODO: optionally handle data.flags.min_request_interval
				// (separate from announce interval)
				const response = Object.assign(data[infoHash], {
					announce: this.announceUrl,
					infoHash: common.binaryToHex(infoHash)
				})
				this.client.emit('scrape', response)
			})
		}
	
		_onSocketClose () {
			if (this.destroyed) return
			this.destroy()
			this._startReconnectTimer()
		}
	
		_onSocketError (err) {
			if (this.destroyed) return
			this.destroy()
			// errors will often happen if a tracker is offline, so don't treat it as fatal
			this.client.emit('warning', err)
			this._startReconnectTimer()
		}
	
		_startReconnectTimer () {
			const ms = Math.floor(Math.random() * RECONNECT_VARIANCE) + Math.min(Math.pow(2, this.retries) * RECONNECT_MINIMUM, RECONNECT_MAXIMUM)
	
			this.reconnecting = true
			clearTimeout(this.reconnectTimer)
			this.reconnectTimer = setTimeout(() => {
				this.retries++
				this._openSocket()
			}, ms)
			if (this.reconnectTimer.unref) this.reconnectTimer.unref()
	
			debug('reconnecting socket in %s ms', ms)
		}
	
		_send (params) {
			if (this.destroyed) return
			this.expectingResponse = true
			const message = JSON.stringify(params)
			debug('send %s', message)
			this.socket.send(message)
		}
	
		_generateOffers (numwant, cb) {
			const self = this
			const offers = []
			debug('generating %s offers', numwant)
	
			for (let i = 0; i < numwant; ++i) {
				generateOffer()
			}
			checkDone()
	
			function generateOffer () {
				const offerId = randombytes(20).toString('hex')
				debug('creating peer (from _generateOffers)')
				const peer = self.peers[offerId] = self._createPeer({ initiator: true })
				peer.once('signal', offer => {
					offers.push({
						offer,
						offer_id: common.hexToBinary(offerId)
					})
					checkDone()
				})
				peer.trackerTimeout = setTimeout(() => {
					debug('tracker timeout: destroying peer')
					peer.trackerTimeout = null
					delete self.peers[offerId]
					peer.destroy()
				}, OFFER_TIMEOUT)
				if (peer.trackerTimeout.unref) peer.trackerTimeout.unref()
			}
	
			function checkDone () {
				if (offers.length === numwant) {
					debug('generated %s offers', numwant)
					cb(offers)
				}
			}
		}
	
		_createPeer (opts) {
			const self = this
	
			opts = Object.assign({
				trickle: false,
				config: self.client._rtcConfig,
				wrtc: self.client._wrtc
			}, opts)
	
			const peer = new Peer(opts)
	
			peer.once('error', onError)
			peer.once('connect', onConnect)
	
			return peer
	
			// Handle peer 'error' events that are fired *before* the peer is emitted in
			// a 'peer' event.
			function onError (err) {
				self.client.emit('warning', new Error(`Connection error: ${err.message}`))
				peer.destroy()
			}
	
			// Once the peer is emitted in a 'peer' event, then it's the consumer's
			// responsibility to listen for errors, so the listeners are removed here.
			function onConnect () {
				peer.removeListener('error', onError)
				peer.removeListener('connect', onConnect)
			}
		}
	}
	
	WebSocketTracker.prototype.DEFAULT_ANNOUNCE_INTERVAL = 30 * 1000 // 30 seconds
	// Normally this shouldn't be accessed but is occasionally useful
	WebSocketTracker._socketPool = socketPool
	
	function noop () {}
	
	module.exports = WebSocketTracker
	
	},{"../common":25,"./tracker":23,"clone":27,"debug":"debug","randombytes":36,"simple-peer":56,"simple-websocket":57,"socks":26}],25:[function(require,module,exports){
	(function (Buffer){(function (){
	/**
	 * Functions/constants needed by both the client and server.
	 */
	
	exports.DEFAULT_ANNOUNCE_PEERS = 50
	exports.MAX_ANNOUNCE_PEERS = 82
	
	exports.binaryToHex = str => {
		if (typeof str !== 'string') {
			str = String(str)
		}
		return Buffer.from(str, 'binary').toString('hex')
	}
	
	exports.hexToBinary = str => {
		if (typeof str !== 'string') {
			str = String(str)
		}
		return Buffer.from(str, 'hex').toString('binary')
	}
	
	// HACK: Fix for WHATWG URL object not parsing non-standard URL schemes like
	// 'udp:'. Just replace it with 'http:' since we only need a few properties.
	//
	// Note: Only affects Chrome and Firefox. Works fine in Node.js, Safari, and
	// Edge.
	//
	// Note: UDP trackers aren't used in the normal browser build, but they are
	// used in a Chrome App build (i.e. by Brave Browser).
	//
	// Bug reports:
	// - Chrome: https://bugs.chromium.org/p/chromium/issues/detail?id=734880
	// - Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=1374505
	exports.parseUrl = str => {
		const url = new URL(str.replace(/^udp:/, 'http:'))
	
		if (str.match(/^udp:/)) {
			Object.defineProperties(url, {
				href: { value: url.href.replace(/^http/, 'udp') },
				protocol: { value: url.protocol.replace(/^http/, 'udp') },
				origin: { value: url.origin.replace(/^http/, 'udp') }
			})
		}
	
		return url
	}
	
	const config = require('./common-node')
	Object.assign(exports, config)
	
	}).call(this)}).call(this,require("buffer").Buffer)
	},{"./common-node":26,"buffer":"buffer"}],26:[function(require,module,exports){
	
	},{}],27:[function(require,module,exports){
	(function (Buffer){(function (){
	var clone = (function() {
	'use strict';
	
	/**
	 * Clones (copies) an Object using deep copying.
	 *
	 * This function supports circular references by default, but if you are certain
	 * there are no circular references in your object, you can save some CPU time
	 * by calling clone(obj, false).
	 *
	 * Caution: if `circular` is false and `parent` contains circular references,
	 * your program may enter an infinite loop and crash.
	 *
	 * @param `parent` - the object to be cloned
	 * @param `circular` - set to true if the object to be cloned may contain
	 *    circular references. (optional - true by default)
	 * @param `depth` - set to a number if the object is only to be cloned to
	 *    a particular depth. (optional - defaults to Infinity)
	 * @param `prototype` - sets the prototype to be used when cloning an object.
	 *    (optional - defaults to parent prototype).
	*/
	function clone(parent, circular, depth, prototype) {
		var filter;
		if (typeof circular === 'object') {
			depth = circular.depth;
			prototype = circular.prototype;
			filter = circular.filter;
			circular = circular.circular
		}
		// maintain two arrays for circular references, where corresponding parents
		// and children have the same index
		var allParents = [];
		var allChildren = [];
	
		var useBuffer = typeof Buffer != 'undefined';
	
		if (typeof circular == 'undefined')
			circular = true;
	
		if (typeof depth == 'undefined')
			depth = Infinity;
	
		// recurse this function so we don't reset allParents and allChildren
		function _clone(parent, depth) {
			// cloning null always returns null
			if (parent === null)
				return null;
	
			if (depth == 0)
				return parent;
	
			var child;
			var proto;
			if (typeof parent != 'object') {
				return parent;
			}
	
			if (clone.__isArray(parent)) {
				child = [];
			} else if (clone.__isRegExp(parent)) {
				child = new RegExp(parent.source, __getRegExpFlags(parent));
				if (parent.lastIndex) child.lastIndex = parent.lastIndex;
			} else if (clone.__isDate(parent)) {
				child = new Date(parent.getTime());
			} else if (useBuffer && Buffer.isBuffer(parent)) {
				if (Buffer.allocUnsafe) {
					// Node.js >= 4.5.0
					child = Buffer.allocUnsafe(parent.length);
				} else {
					// Older Node.js versions
					child = new Buffer(parent.length);
				}
				parent.copy(child);
				return child;
			} else {
				if (typeof prototype == 'undefined') {
					proto = Object.getPrototypeOf(parent);
					child = Object.create(proto);
				}
				else {
					child = Object.create(prototype);
					proto = prototype;
				}
			}
	
			if (circular) {
				var index = allParents.indexOf(parent);
	
				if (index != -1) {
					return allChildren[index];
				}
				allParents.push(parent);
				allChildren.push(child);
			}
	
			for (var i in parent) {
				var attrs;
				if (proto) {
					attrs = Object.getOwnPropertyDescriptor(proto, i);
				}
	
				if (attrs && attrs.set == null) {
					continue;
				}
				child[i] = _clone(parent[i], depth - 1);
			}
	
			return child;
		}
	
		return _clone(parent, depth);
	}
	
	/**
	 * Simple flat clone using prototype, accepts only objects, usefull for property
	 * override on FLAT configuration object (no nested props).
	 *
	 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
	 * works.
	 */
	clone.clonePrototype = function clonePrototype(parent) {
		if (parent === null)
			return null;
	
		var c = function () {};
		c.prototype = parent;
		return new c();
	};
	
	// private utility functions
	
	function __objToStr(o) {
		return Object.prototype.toString.call(o);
	};
	clone.__objToStr = __objToStr;
	
	function __isDate(o) {
		return typeof o === 'object' && __objToStr(o) === '[object Date]';
	};
	clone.__isDate = __isDate;
	
	function __isArray(o) {
		return typeof o === 'object' && __objToStr(o) === '[object Array]';
	};
	clone.__isArray = __isArray;
	
	function __isRegExp(o) {
		return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
	};
	clone.__isRegExp = __isRegExp;
	
	function __getRegExpFlags(re) {
		var flags = '';
		if (re.global) flags += 'g';
		if (re.ignoreCase) flags += 'i';
		if (re.multiline) flags += 'm';
		return flags;
	};
	clone.__getRegExpFlags = __getRegExpFlags;
	
	return clone;
	})();
	
	if (typeof module === 'object' && module.exports) {
		module.exports = clone;
	}
	
	}).call(this)}).call(this,require("buffer").Buffer)
	},{"buffer":"buffer"}],28:[function(require,module,exports){
	'use strict';
	
	/**
	 * @typedef {{ [key: string]: any }} Extensions
	 * @typedef {Error} Err
	 * @property {string} message
	 */
	
	/**
	 *
	 * @param {Error} obj
	 * @param {Extensions} props
	 * @returns {Error & Extensions}
	 */
	function assign(obj, props) {
			for (const key in props) {
					Object.defineProperty(obj, key, {
							value: props[key],
							enumerable: true,
							configurable: true,
					});
			}
	
			return obj;
	}
	
	/**
	 *
	 * @param {any} err - An Error
	 * @param {string|Extensions} code - A string code or props to set on the error
	 * @param {Extensions} [props] - Props to set on the error
	 * @returns {Error & Extensions}
	 */
	function createError(err, code, props) {
			if (!err || typeof err === 'string') {
					throw new TypeError('Please pass an Error to err-code');
			}
	
			if (!props) {
					props = {};
			}
	
			if (typeof code === 'object') {
					props = code;
					code = '';
			}
	
			if (code) {
					props.code = code;
			}
	
			try {
					return assign(err, props);
			} catch (_) {
					props.message = err.message;
					props.stack = err.stack;
	
					const ErrClass = function () {};
	
					ErrClass.prototype = Object.create(Object.getPrototypeOf(err));
	
					// @ts-ignore
					const output = assign(new ErrClass(), props);
	
					return output;
			}
	}
	
	module.exports = createError;
	
	},{}],29:[function(require,module,exports){
	// originally pulled out of simple-peer
	
	module.exports = function getBrowserRTC () {
		if (typeof globalThis === 'undefined') return null
		var wrtc = {
			RTCPeerConnection: globalThis.RTCPeerConnection || globalThis.mozRTCPeerConnection ||
				globalThis.webkitRTCPeerConnection,
			RTCSessionDescription: globalThis.RTCSessionDescription ||
				globalThis.mozRTCSessionDescription || globalThis.webkitRTCSessionDescription,
			RTCIceCandidate: globalThis.RTCIceCandidate || globalThis.mozRTCIceCandidate ||
				globalThis.webkitRTCIceCandidate
		}
		if (!wrtc.RTCPeerConnection) return null
		return wrtc
	}
	
	},{}],30:[function(require,module,exports){
	(function (global){(function (){
	var win;
	
	if (typeof window !== "undefined") {
			win = window;
	} else if (typeof global !== "undefined") {
			win = global;
	} else if (typeof self !== "undefined"){
			win = self;
	} else {
			win = {};
	}
	
	module.exports = win;
	
	}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{}],31:[function(require,module,exports){
	if (typeof Object.create === 'function') {
		// implementation from standard node.js 'util' module
		module.exports = function inherits(ctor, superCtor) {
			if (superCtor) {
				ctor.super_ = superCtor
				ctor.prototype = Object.create(superCtor.prototype, {
					constructor: {
						value: ctor,
						enumerable: false,
						writable: true,
						configurable: true
					}
				})
			}
		};
	} else {
		// old school shim for old browsers
		module.exports = function inherits(ctor, superCtor) {
			if (superCtor) {
				ctor.super_ = superCtor
				var TempCtor = function () {}
				TempCtor.prototype = superCtor.prototype
				ctor.prototype = new TempCtor()
				ctor.prototype.constructor = ctor
			}
		}
	}
	
	},{}],32:[function(require,module,exports){
	/*! @name m3u8-parser @version 4.6.0 @license Apache-2.0 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	var _inheritsLoose = require('@babel/runtime/helpers/inheritsLoose');
	var Stream = require('@videojs/vhs-utils/cjs/stream.js');
	var _extends = require('@babel/runtime/helpers/extends');
	var _assertThisInitialized = require('@babel/runtime/helpers/assertThisInitialized');
	var decodeB64ToUint8Array = require('@videojs/vhs-utils/cjs/decode-b64-to-uint8-array.js');
	
	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }
	
	var _inheritsLoose__default = /*#__PURE__*/_interopDefaultLegacy(_inheritsLoose);
	var Stream__default = /*#__PURE__*/_interopDefaultLegacy(Stream);
	var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
	var _assertThisInitialized__default = /*#__PURE__*/_interopDefaultLegacy(_assertThisInitialized);
	var decodeB64ToUint8Array__default = /*#__PURE__*/_interopDefaultLegacy(decodeB64ToUint8Array);
	
	/**
	 * A stream that buffers string input and generates a `data` event for each
	 * line.
	 *
	 * @class LineStream
	 * @extends Stream
	 */
	
	var LineStream = /*#__PURE__*/function (_Stream) {
		_inheritsLoose__default['default'](LineStream, _Stream);
	
		function LineStream() {
			var _this;
	
			_this = _Stream.call(this) || this;
			_this.buffer = '';
			return _this;
		}
		/**
		 * Add new data to be parsed.
		 *
		 * @param {string} data the text to process
		 */
	
	
		var _proto = LineStream.prototype;
	
		_proto.push = function push(data) {
			var nextNewline;
			this.buffer += data;
			nextNewline = this.buffer.indexOf('\n');
	
			for (; nextNewline > -1; nextNewline = this.buffer.indexOf('\n')) {
				this.trigger('data', this.buffer.substring(0, nextNewline));
				this.buffer = this.buffer.substring(nextNewline + 1);
			}
		};
	
		return LineStream;
	}(Stream__default['default']);
	
	var TAB = String.fromCharCode(0x09);
	
	var parseByterange = function parseByterange(byterangeString) {
		// optionally match and capture 0+ digits before `@`
		// optionally match and capture 0+ digits after `@`
		var match = /([0-9.]*)?@?([0-9.]*)?/.exec(byterangeString || '');
		var result = {};
	
		if (match[1]) {
			result.length = parseInt(match[1], 10);
		}
	
		if (match[2]) {
			result.offset = parseInt(match[2], 10);
		}
	
		return result;
	};
	/**
	 * "forgiving" attribute list psuedo-grammar:
	 * attributes -> keyvalue (',' keyvalue)*
	 * keyvalue   -> key '=' value
	 * key        -> [^=]*
	 * value      -> '"' [^"]* '"' | [^,]*
	 */
	
	
	var attributeSeparator = function attributeSeparator() {
		var key = '[^=]*';
		var value = '"[^"]*"|[^,]*';
		var keyvalue = '(?:' + key + ')=(?:' + value + ')';
		return new RegExp('(?:^|,)(' + keyvalue + ')');
	};
	/**
	 * Parse attributes from a line given the separator
	 *
	 * @param {string} attributes the attribute line to parse
	 */
	
	
	var parseAttributes = function parseAttributes(attributes) {
		// split the string using attributes as the separator
		var attrs = attributes.split(attributeSeparator());
		var result = {};
		var i = attrs.length;
		var attr;
	
		while (i--) {
			// filter out unmatched portions of the string
			if (attrs[i] === '') {
				continue;
			} // split the key and value
	
	
			attr = /([^=]*)=(.*)/.exec(attrs[i]).slice(1); // trim whitespace and remove optional quotes around the value
	
			attr[0] = attr[0].replace(/^\s+|\s+$/g, '');
			attr[1] = attr[1].replace(/^\s+|\s+$/g, '');
			attr[1] = attr[1].replace(/^['"](.*)['"]$/g, '$1');
			result[attr[0]] = attr[1];
		}
	
		return result;
	};
	/**
	 * A line-level M3U8 parser event stream. It expects to receive input one
	 * line at a time and performs a context-free parse of its contents. A stream
	 * interpretation of a manifest can be useful if the manifest is expected to
	 * be too large to fit comfortably into memory or the entirety of the input
	 * is not immediately available. Otherwise, it's probably much easier to work
	 * with a regular `Parser` object.
	 *
	 * Produces `data` events with an object that captures the parser's
	 * interpretation of the input. That object has a property `tag` that is one
	 * of `uri`, `comment`, or `tag`. URIs only have a single additional
	 * property, `line`, which captures the entirety of the input without
	 * interpretation. Comments similarly have a single additional property
	 * `text` which is the input without the leading `#`.
	 *
	 * Tags always have a property `tagType` which is the lower-cased version of
	 * the M3U8 directive without the `#EXT` or `#EXT-X-` prefix. For instance,
	 * `#EXT-X-MEDIA-SEQUENCE` becomes `media-sequence` when parsed. Unrecognized
	 * tags are given the tag type `unknown` and a single additional property
	 * `data` with the remainder of the input.
	 *
	 * @class ParseStream
	 * @extends Stream
	 */
	
	
	var ParseStream = /*#__PURE__*/function (_Stream) {
		_inheritsLoose__default['default'](ParseStream, _Stream);
	
		function ParseStream() {
			var _this;
	
			_this = _Stream.call(this) || this;
			_this.customParsers = [];
			_this.tagMappers = [];
			return _this;
		}
		/**
		 * Parses an additional line of input.
		 *
		 * @param {string} line a single line of an M3U8 file to parse
		 */
	
	
		var _proto = ParseStream.prototype;
	
		_proto.push = function push(line) {
			var _this2 = this;
	
			var match;
			var event; // strip whitespace
	
			line = line.trim();
	
			if (line.length === 0) {
				// ignore empty lines
				return;
			} // URIs
	
	
			if (line[0] !== '#') {
				this.trigger('data', {
					type: 'uri',
					uri: line
				});
				return;
			} // map tags
	
	
			var newLines = this.tagMappers.reduce(function (acc, mapper) {
				var mappedLine = mapper(line); // skip if unchanged
	
				if (mappedLine === line) {
					return acc;
				}
	
				return acc.concat([mappedLine]);
			}, [line]);
			newLines.forEach(function (newLine) {
				for (var i = 0; i < _this2.customParsers.length; i++) {
					if (_this2.customParsers[i].call(_this2, newLine)) {
						return;
					}
				} // Comments
	
	
				if (newLine.indexOf('#EXT') !== 0) {
					_this2.trigger('data', {
						type: 'comment',
						text: newLine.slice(1)
					});
	
					return;
				} // strip off any carriage returns here so the regex matching
				// doesn't have to account for them.
	
	
				newLine = newLine.replace('\r', ''); // Tags
	
				match = /^#EXTM3U/.exec(newLine);
	
				if (match) {
					_this2.trigger('data', {
						type: 'tag',
						tagType: 'm3u'
					});
	
					return;
				}
	
				match = /^#EXTINF:?([0-9\.]*)?,?(.*)?$/.exec(newLine);
	
				if (match) {
					event = {
						type: 'tag',
						tagType: 'inf'
					};
	
					if (match[1]) {
						event.duration = parseFloat(match[1]);
					}
	
					if (match[2]) {
						event.title = match[2];
					}
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-TARGETDURATION:?([0-9.]*)?/.exec(newLine);
	
				if (match) {
					event = {
						type: 'tag',
						tagType: 'targetduration'
					};
	
					if (match[1]) {
						event.duration = parseInt(match[1], 10);
					}
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-VERSION:?([0-9.]*)?/.exec(newLine);
	
				if (match) {
					event = {
						type: 'tag',
						tagType: 'version'
					};
	
					if (match[1]) {
						event.version = parseInt(match[1], 10);
					}
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-MEDIA-SEQUENCE:?(\-?[0-9.]*)?/.exec(newLine);
	
				if (match) {
					event = {
						type: 'tag',
						tagType: 'media-sequence'
					};
	
					if (match[1]) {
						event.number = parseInt(match[1], 10);
					}
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-DISCONTINUITY-SEQUENCE:?(\-?[0-9.]*)?/.exec(newLine);
	
				if (match) {
					event = {
						type: 'tag',
						tagType: 'discontinuity-sequence'
					};
	
					if (match[1]) {
						event.number = parseInt(match[1], 10);
					}
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-PLAYLIST-TYPE:?(.*)?$/.exec(newLine);
	
				if (match) {
					event = {
						type: 'tag',
						tagType: 'playlist-type'
					};
	
					if (match[1]) {
						event.playlistType = match[1];
					}
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-BYTERANGE:?(.*)?$/.exec(newLine);
	
				if (match) {
					event = _extends__default['default'](parseByterange(match[1]), {
						type: 'tag',
						tagType: 'byterange'
					});
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-ALLOW-CACHE:?(YES|NO)?/.exec(newLine);
	
				if (match) {
					event = {
						type: 'tag',
						tagType: 'allow-cache'
					};
	
					if (match[1]) {
						event.allowed = !/NO/.test(match[1]);
					}
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-MAP:?(.*)$/.exec(newLine);
	
				if (match) {
					event = {
						type: 'tag',
						tagType: 'map'
					};
	
					if (match[1]) {
						var attributes = parseAttributes(match[1]);
	
						if (attributes.URI) {
							event.uri = attributes.URI;
						}
	
						if (attributes.BYTERANGE) {
							event.byterange = parseByterange(attributes.BYTERANGE);
						}
					}
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-STREAM-INF:?(.*)$/.exec(newLine);
	
				if (match) {
					event = {
						type: 'tag',
						tagType: 'stream-inf'
					};
	
					if (match[1]) {
						event.attributes = parseAttributes(match[1]);
	
						if (event.attributes.RESOLUTION) {
							var split = event.attributes.RESOLUTION.split('x');
							var resolution = {};
	
							if (split[0]) {
								resolution.width = parseInt(split[0], 10);
							}
	
							if (split[1]) {
								resolution.height = parseInt(split[1], 10);
							}
	
							event.attributes.RESOLUTION = resolution;
						}
	
						if (event.attributes.BANDWIDTH) {
							event.attributes.BANDWIDTH = parseInt(event.attributes.BANDWIDTH, 10);
						}
	
						if (event.attributes['PROGRAM-ID']) {
							event.attributes['PROGRAM-ID'] = parseInt(event.attributes['PROGRAM-ID'], 10);
						}
					}
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-MEDIA:?(.*)$/.exec(newLine);
	
				if (match) {
					event = {
						type: 'tag',
						tagType: 'media'
					};
	
					if (match[1]) {
						event.attributes = parseAttributes(match[1]);
					}
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-ENDLIST/.exec(newLine);
	
				if (match) {
					_this2.trigger('data', {
						type: 'tag',
						tagType: 'endlist'
					});
	
					return;
				}
	
				match = /^#EXT-X-DISCONTINUITY/.exec(newLine);
	
				if (match) {
					_this2.trigger('data', {
						type: 'tag',
						tagType: 'discontinuity'
					});
	
					return;
				}
	
				match = /^#EXT-X-PROGRAM-DATE-TIME:?(.*)$/.exec(newLine);
	
				if (match) {
					event = {
						type: 'tag',
						tagType: 'program-date-time'
					};
	
					if (match[1]) {
						event.dateTimeString = match[1];
						event.dateTimeObject = new Date(match[1]);
					}
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-KEY:?(.*)$/.exec(newLine);
	
				if (match) {
					event = {
						type: 'tag',
						tagType: 'key'
					};
	
					if (match[1]) {
						event.attributes = parseAttributes(match[1]); // parse the IV string into a Uint32Array
	
						if (event.attributes.IV) {
							if (event.attributes.IV.substring(0, 2).toLowerCase() === '0x') {
								event.attributes.IV = event.attributes.IV.substring(2);
							}
	
							event.attributes.IV = event.attributes.IV.match(/.{8}/g);
							event.attributes.IV[0] = parseInt(event.attributes.IV[0], 16);
							event.attributes.IV[1] = parseInt(event.attributes.IV[1], 16);
							event.attributes.IV[2] = parseInt(event.attributes.IV[2], 16);
							event.attributes.IV[3] = parseInt(event.attributes.IV[3], 16);
							event.attributes.IV = new Uint32Array(event.attributes.IV);
						}
					}
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-START:?(.*)$/.exec(newLine);
	
				if (match) {
					event = {
						type: 'tag',
						tagType: 'start'
					};
	
					if (match[1]) {
						event.attributes = parseAttributes(match[1]);
						event.attributes['TIME-OFFSET'] = parseFloat(event.attributes['TIME-OFFSET']);
						event.attributes.PRECISE = /YES/.test(event.attributes.PRECISE);
					}
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-CUE-OUT-CONT:?(.*)?$/.exec(newLine);
	
				if (match) {
					event = {
						type: 'tag',
						tagType: 'cue-out-cont'
					};
	
					if (match[1]) {
						event.data = match[1];
					} else {
						event.data = '';
					}
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-CUE-OUT:?(.*)?$/.exec(newLine);
	
				if (match) {
					event = {
						type: 'tag',
						tagType: 'cue-out'
					};
	
					if (match[1]) {
						event.data = match[1];
					} else {
						event.data = '';
					}
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-CUE-IN:?(.*)?$/.exec(newLine);
	
				if (match) {
					event = {
						type: 'tag',
						tagType: 'cue-in'
					};
	
					if (match[1]) {
						event.data = match[1];
					} else {
						event.data = '';
					}
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-SKIP:(.*)$/.exec(newLine);
	
				if (match && match[1]) {
					event = {
						type: 'tag',
						tagType: 'skip'
					};
					event.attributes = parseAttributes(match[1]);
	
					if (event.attributes.hasOwnProperty('SKIPPED-SEGMENTS')) {
						event.attributes['SKIPPED-SEGMENTS'] = parseInt(event.attributes['SKIPPED-SEGMENTS'], 10);
					}
	
					if (event.attributes.hasOwnProperty('RECENTLY-REMOVED-DATERANGES')) {
						event.attributes['RECENTLY-REMOVED-DATERANGES'] = event.attributes['RECENTLY-REMOVED-DATERANGES'].split(TAB);
					}
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-PART:(.*)$/.exec(newLine);
	
				if (match && match[1]) {
					event = {
						type: 'tag',
						tagType: 'part'
					};
					event.attributes = parseAttributes(match[1]);
					['DURATION'].forEach(function (key) {
						if (event.attributes.hasOwnProperty(key)) {
							event.attributes[key] = parseFloat(event.attributes[key]);
						}
					});
					['INDEPENDENT', 'GAP'].forEach(function (key) {
						if (event.attributes.hasOwnProperty(key)) {
							event.attributes[key] = /YES/.test(event.attributes[key]);
						}
					});
	
					if (event.attributes.hasOwnProperty('BYTERANGE')) {
						event.attributes.byterange = parseByterange(event.attributes.BYTERANGE);
					}
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-SERVER-CONTROL:(.*)$/.exec(newLine);
	
				if (match && match[1]) {
					event = {
						type: 'tag',
						tagType: 'server-control'
					};
					event.attributes = parseAttributes(match[1]);
					['CAN-SKIP-UNTIL', 'PART-HOLD-BACK', 'HOLD-BACK'].forEach(function (key) {
						if (event.attributes.hasOwnProperty(key)) {
							event.attributes[key] = parseFloat(event.attributes[key]);
						}
					});
					['CAN-SKIP-DATERANGES', 'CAN-BLOCK-RELOAD'].forEach(function (key) {
						if (event.attributes.hasOwnProperty(key)) {
							event.attributes[key] = /YES/.test(event.attributes[key]);
						}
					});
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-PART-INF:(.*)$/.exec(newLine);
	
				if (match && match[1]) {
					event = {
						type: 'tag',
						tagType: 'part-inf'
					};
					event.attributes = parseAttributes(match[1]);
					['PART-TARGET'].forEach(function (key) {
						if (event.attributes.hasOwnProperty(key)) {
							event.attributes[key] = parseFloat(event.attributes[key]);
						}
					});
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-PRELOAD-HINT:(.*)$/.exec(newLine);
	
				if (match && match[1]) {
					event = {
						type: 'tag',
						tagType: 'preload-hint'
					};
					event.attributes = parseAttributes(match[1]);
					['BYTERANGE-START', 'BYTERANGE-LENGTH'].forEach(function (key) {
						if (event.attributes.hasOwnProperty(key)) {
							event.attributes[key] = parseInt(event.attributes[key], 10);
							var subkey = key === 'BYTERANGE-LENGTH' ? 'length' : 'offset';
							event.attributes.byterange = event.attributes.byterange || {};
							event.attributes.byterange[subkey] = event.attributes[key]; // only keep the parsed byterange object.
	
							delete event.attributes[key];
						}
					});
	
					_this2.trigger('data', event);
	
					return;
				}
	
				match = /^#EXT-X-RENDITION-REPORT:(.*)$/.exec(newLine);
	
				if (match && match[1]) {
					event = {
						type: 'tag',
						tagType: 'rendition-report'
					};
					event.attributes = parseAttributes(match[1]);
					['LAST-MSN', 'LAST-PART'].forEach(function (key) {
						if (event.attributes.hasOwnProperty(key)) {
							event.attributes[key] = parseInt(event.attributes[key], 10);
						}
					});
	
					_this2.trigger('data', event);
	
					return;
				} // unknown tag type
	
	
				_this2.trigger('data', {
					type: 'tag',
					data: newLine.slice(4)
				});
			});
		}
		/**
		 * Add a parser for custom headers
		 *
		 * @param {Object}   options              a map of options for the added parser
		 * @param {RegExp}   options.expression   a regular expression to match the custom header
		 * @param {string}   options.customType   the custom type to register to the output
		 * @param {Function} [options.dataParser] function to parse the line into an object
		 * @param {boolean}  [options.segment]    should tag data be attached to the segment object
		 */
		;
	
		_proto.addParser = function addParser(_ref) {
			var _this3 = this;
	
			var expression = _ref.expression,
					customType = _ref.customType,
					dataParser = _ref.dataParser,
					segment = _ref.segment;
	
			if (typeof dataParser !== 'function') {
				dataParser = function dataParser(line) {
					return line;
				};
			}
	
			this.customParsers.push(function (line) {
				var match = expression.exec(line);
	
				if (match) {
					_this3.trigger('data', {
						type: 'custom',
						data: dataParser(line),
						customType: customType,
						segment: segment
					});
	
					return true;
				}
			});
		}
		/**
		 * Add a custom header mapper
		 *
		 * @param {Object}   options
		 * @param {RegExp}   options.expression   a regular expression to match the custom header
		 * @param {Function} options.map          function to translate tag into a different tag
		 */
		;
	
		_proto.addTagMapper = function addTagMapper(_ref2) {
			var expression = _ref2.expression,
					map = _ref2.map;
	
			var mapFn = function mapFn(line) {
				if (expression.test(line)) {
					return map(line);
				}
	
				return line;
			};
	
			this.tagMappers.push(mapFn);
		};
	
		return ParseStream;
	}(Stream__default['default']);
	
	var camelCase = function camelCase(str) {
		return str.toLowerCase().replace(/-(\w)/g, function (a) {
			return a[1].toUpperCase();
		});
	};
	
	var camelCaseKeys = function camelCaseKeys(attributes) {
		var result = {};
		Object.keys(attributes).forEach(function (key) {
			result[camelCase(key)] = attributes[key];
		});
		return result;
	}; // set SERVER-CONTROL hold back based upon targetDuration and partTargetDuration
	// we need this helper because defaults are based upon targetDuration and
	// partTargetDuration being set, but they may not be if SERVER-CONTROL appears before
	// target durations are set.
	
	
	var setHoldBack = function setHoldBack(manifest) {
		var serverControl = manifest.serverControl,
				targetDuration = manifest.targetDuration,
				partTargetDuration = manifest.partTargetDuration;
	
		if (!serverControl) {
			return;
		}
	
		var tag = '#EXT-X-SERVER-CONTROL';
		var hb = 'holdBack';
		var phb = 'partHoldBack';
		var minTargetDuration = targetDuration && targetDuration * 3;
		var minPartDuration = partTargetDuration && partTargetDuration * 2;
	
		if (targetDuration && !serverControl.hasOwnProperty(hb)) {
			serverControl[hb] = minTargetDuration;
			this.trigger('info', {
				message: tag + " defaulting HOLD-BACK to targetDuration * 3 (" + minTargetDuration + ")."
			});
		}
	
		if (minTargetDuration && serverControl[hb] < minTargetDuration) {
			this.trigger('warn', {
				message: tag + " clamping HOLD-BACK (" + serverControl[hb] + ") to targetDuration * 3 (" + minTargetDuration + ")"
			});
			serverControl[hb] = minTargetDuration;
		} // default no part hold back to part target duration * 3
	
	
		if (partTargetDuration && !serverControl.hasOwnProperty(phb)) {
			serverControl[phb] = partTargetDuration * 3;
			this.trigger('info', {
				message: tag + " defaulting PART-HOLD-BACK to partTargetDuration * 3 (" + serverControl[phb] + ")."
			});
		} // if part hold back is too small default it to part target duration * 2
	
	
		if (partTargetDuration && serverControl[phb] < minPartDuration) {
			this.trigger('warn', {
				message: tag + " clamping PART-HOLD-BACK (" + serverControl[phb] + ") to partTargetDuration * 2 (" + minPartDuration + ")."
			});
			serverControl[phb] = minPartDuration;
		}
	};
	/**
	 * A parser for M3U8 files. The current interpretation of the input is
	 * exposed as a property `manifest` on parser objects. It's just two lines to
	 * create and parse a manifest once you have the contents available as a string:
	 *
	 * ```js
	 * var parser = new m3u8.Parser();
	 * parser.push(xhr.responseText);
	 * ```
	 *
	 * New input can later be applied to update the manifest object by calling
	 * `push` again.
	 *
	 * The parser attempts to create a usable manifest object even if the
	 * underlying input is somewhat nonsensical. It emits `info` and `warning`
	 * events during the parse if it encounters input that seems invalid or
	 * requires some property of the manifest object to be defaulted.
	 *
	 * @class Parser
	 * @extends Stream
	 */
	
	
	var Parser = /*#__PURE__*/function (_Stream) {
		_inheritsLoose__default['default'](Parser, _Stream);
	
		function Parser() {
			var _this;
	
			_this = _Stream.call(this) || this;
			_this.lineStream = new LineStream();
			_this.parseStream = new ParseStream();
	
			_this.lineStream.pipe(_this.parseStream);
			/* eslint-disable consistent-this */
	
	
			var self = _assertThisInitialized__default['default'](_this);
			/* eslint-enable consistent-this */
	
	
			var uris = [];
			var currentUri = {}; // if specified, the active EXT-X-MAP definition
	
			var currentMap; // if specified, the active decryption key
	
			var _key;
	
			var hasParts = false;
	
			var noop = function noop() {};
	
			var defaultMediaGroups = {
				'AUDIO': {},
				'VIDEO': {},
				'CLOSED-CAPTIONS': {},
				'SUBTITLES': {}
			}; // This is the Widevine UUID from DASH IF IOP. The same exact string is
			// used in MPDs with Widevine encrypted streams.
	
			var widevineUuid = 'urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed'; // group segments into numbered timelines delineated by discontinuities
	
			var currentTimeline = 0; // the manifest is empty until the parse stream begins delivering data
	
			_this.manifest = {
				allowCache: true,
				discontinuityStarts: [],
				segments: []
			}; // keep track of the last seen segment's byte range end, as segments are not required
			// to provide the offset, in which case it defaults to the next byte after the
			// previous segment
	
			var lastByterangeEnd = 0; // keep track of the last seen part's byte range end.
	
			var lastPartByterangeEnd = 0;
	
			_this.on('end', function () {
				// only add preloadSegment if we don't yet have a uri for it.
				// and we actually have parts/preloadHints
				if (currentUri.uri || !currentUri.parts && !currentUri.preloadHints) {
					return;
				}
	
				if (!currentUri.map && currentMap) {
					currentUri.map = currentMap;
				}
	
				if (!currentUri.key && _key) {
					currentUri.key = _key;
				}
	
				if (!currentUri.timeline && typeof currentTimeline === 'number') {
					currentUri.timeline = currentTimeline;
				}
	
				_this.manifest.preloadSegment = currentUri;
			}); // update the manifest with the m3u8 entry from the parse stream
	
	
			_this.parseStream.on('data', function (entry) {
				var mediaGroup;
				var rendition;
				({
					tag: function tag() {
						// switch based on the tag type
						(({
							version: function version() {
								if (entry.version) {
									this.manifest.version = entry.version;
								}
							},
							'allow-cache': function allowCache() {
								this.manifest.allowCache = entry.allowed;
	
								if (!('allowed' in entry)) {
									this.trigger('info', {
										message: 'defaulting allowCache to YES'
									});
									this.manifest.allowCache = true;
								}
							},
							byterange: function byterange() {
								var byterange = {};
	
								if ('length' in entry) {
									currentUri.byterange = byterange;
									byterange.length = entry.length;
	
									if (!('offset' in entry)) {
										/*
										 * From the latest spec (as of this writing):
										 * https://tools.ietf.org/html/draft-pantos-http-live-streaming-23#section-4.3.2.2
										 *
										 * Same text since EXT-X-BYTERANGE's introduction in draft 7:
										 * https://tools.ietf.org/html/draft-pantos-http-live-streaming-07#section-3.3.1)
										 *
										 * "If o [offset] is not present, the sub-range begins at the next byte
										 * following the sub-range of the previous media segment."
										 */
										entry.offset = lastByterangeEnd;
									}
								}
	
								if ('offset' in entry) {
									currentUri.byterange = byterange;
									byterange.offset = entry.offset;
								}
	
								lastByterangeEnd = byterange.offset + byterange.length;
							},
							endlist: function endlist() {
								this.manifest.endList = true;
							},
							inf: function inf() {
								if (!('mediaSequence' in this.manifest)) {
									this.manifest.mediaSequence = 0;
									this.trigger('info', {
										message: 'defaulting media sequence to zero'
									});
								}
	
								if (!('discontinuitySequence' in this.manifest)) {
									this.manifest.discontinuitySequence = 0;
									this.trigger('info', {
										message: 'defaulting discontinuity sequence to zero'
									});
								}
	
								if (entry.duration > 0) {
									currentUri.duration = entry.duration;
								}
	
								if (entry.duration === 0) {
									currentUri.duration = 0.01;
									this.trigger('info', {
										message: 'updating zero segment duration to a small value'
									});
								}
	
								this.manifest.segments = uris;
							},
							key: function key() {
								if (!entry.attributes) {
									this.trigger('warn', {
										message: 'ignoring key declaration without attribute list'
									});
									return;
								} // clear the active encryption key
	
	
								if (entry.attributes.METHOD === 'NONE') {
									_key = null;
									return;
								}
	
								if (!entry.attributes.URI) {
									this.trigger('warn', {
										message: 'ignoring key declaration without URI'
									});
									return;
								} // check if the content is encrypted for Widevine
								// Widevine/HLS spec: https://storage.googleapis.com/wvdocs/Widevine_DRM_HLS.pdf
	
	
								if (entry.attributes.KEYFORMAT === widevineUuid) {
									var VALID_METHODS = ['SAMPLE-AES', 'SAMPLE-AES-CTR', 'SAMPLE-AES-CENC'];
	
									if (VALID_METHODS.indexOf(entry.attributes.METHOD) === -1) {
										this.trigger('warn', {
											message: 'invalid key method provided for Widevine'
										});
										return;
									}
	
									if (entry.attributes.METHOD === 'SAMPLE-AES-CENC') {
										this.trigger('warn', {
											message: 'SAMPLE-AES-CENC is deprecated, please use SAMPLE-AES-CTR instead'
										});
									}
	
									if (entry.attributes.URI.substring(0, 23) !== 'data:text/plain;base64,') {
										this.trigger('warn', {
											message: 'invalid key URI provided for Widevine'
										});
										return;
									}
	
									if (!(entry.attributes.KEYID && entry.attributes.KEYID.substring(0, 2) === '0x')) {
										this.trigger('warn', {
											message: 'invalid key ID provided for Widevine'
										});
										return;
									} // if Widevine key attributes are valid, store them as `contentProtection`
									// on the manifest to emulate Widevine tag structure in a DASH mpd
	
	
									this.manifest.contentProtection = {
										'com.widevine.alpha': {
											attributes: {
												schemeIdUri: entry.attributes.KEYFORMAT,
												// remove '0x' from the key id string
												keyId: entry.attributes.KEYID.substring(2)
											},
											// decode the base64-encoded PSSH box
											pssh: decodeB64ToUint8Array__default['default'](entry.attributes.URI.split(',')[1])
										}
									};
									return;
								}
	
								if (!entry.attributes.METHOD) {
									this.trigger('warn', {
										message: 'defaulting key method to AES-128'
									});
								} // setup an encryption key for upcoming segments
	
	
								_key = {
									method: entry.attributes.METHOD || 'AES-128',
									uri: entry.attributes.URI
								};
	
								if (typeof entry.attributes.IV !== 'undefined') {
									_key.iv = entry.attributes.IV;
								}
							},
							'media-sequence': function mediaSequence() {
								if (!isFinite(entry.number)) {
									this.trigger('warn', {
										message: 'ignoring invalid media sequence: ' + entry.number
									});
									return;
								}
	
								this.manifest.mediaSequence = entry.number;
							},
							'discontinuity-sequence': function discontinuitySequence() {
								if (!isFinite(entry.number)) {
									this.trigger('warn', {
										message: 'ignoring invalid discontinuity sequence: ' + entry.number
									});
									return;
								}
	
								this.manifest.discontinuitySequence = entry.number;
								currentTimeline = entry.number;
							},
							'playlist-type': function playlistType() {
								if (!/VOD|EVENT/.test(entry.playlistType)) {
									this.trigger('warn', {
										message: 'ignoring unknown playlist type: ' + entry.playlist
									});
									return;
								}
	
								this.manifest.playlistType = entry.playlistType;
							},
							map: function map() {
								currentMap = {};
	
								if (entry.uri) {
									currentMap.uri = entry.uri;
								}
	
								if (entry.byterange) {
									currentMap.byterange = entry.byterange;
								}
							},
							'stream-inf': function streamInf() {
								this.manifest.playlists = uris;
								this.manifest.mediaGroups = this.manifest.mediaGroups || defaultMediaGroups;
	
								if (!entry.attributes) {
									this.trigger('warn', {
										message: 'ignoring empty stream-inf attributes'
									});
									return;
								}
	
								if (!currentUri.attributes) {
									currentUri.attributes = {};
								}
	
								_extends__default['default'](currentUri.attributes, entry.attributes);
							},
							media: function media() {
								this.manifest.mediaGroups = this.manifest.mediaGroups || defaultMediaGroups;
	
								if (!(entry.attributes && entry.attributes.TYPE && entry.attributes['GROUP-ID'] && entry.attributes.NAME)) {
									this.trigger('warn', {
										message: 'ignoring incomplete or missing media group'
									});
									return;
								} // find the media group, creating defaults as necessary
	
	
								var mediaGroupType = this.manifest.mediaGroups[entry.attributes.TYPE];
								mediaGroupType[entry.attributes['GROUP-ID']] = mediaGroupType[entry.attributes['GROUP-ID']] || {};
								mediaGroup = mediaGroupType[entry.attributes['GROUP-ID']]; // collect the rendition metadata
	
								rendition = {
									default: /yes/i.test(entry.attributes.DEFAULT)
								};
	
								if (rendition.default) {
									rendition.autoselect = true;
								} else {
									rendition.autoselect = /yes/i.test(entry.attributes.AUTOSELECT);
								}
	
								if (entry.attributes.LANGUAGE) {
									rendition.language = entry.attributes.LANGUAGE;
								}
	
								if (entry.attributes.URI) {
									rendition.uri = entry.attributes.URI;
								}
	
								if (entry.attributes['INSTREAM-ID']) {
									rendition.instreamId = entry.attributes['INSTREAM-ID'];
								}
	
								if (entry.attributes.CHARACTERISTICS) {
									rendition.characteristics = entry.attributes.CHARACTERISTICS;
								}
	
								if (entry.attributes.FORCED) {
									rendition.forced = /yes/i.test(entry.attributes.FORCED);
								} // insert the new rendition
	
	
								mediaGroup[entry.attributes.NAME] = rendition;
							},
							discontinuity: function discontinuity() {
								currentTimeline += 1;
								currentUri.discontinuity = true;
								this.manifest.discontinuityStarts.push(uris.length);
							},
							'program-date-time': function programDateTime() {
								if (typeof this.manifest.dateTimeString === 'undefined') {
									// PROGRAM-DATE-TIME is a media-segment tag, but for backwards
									// compatibility, we add the first occurence of the PROGRAM-DATE-TIME tag
									// to the manifest object
									// TODO: Consider removing this in future major version
									this.manifest.dateTimeString = entry.dateTimeString;
									this.manifest.dateTimeObject = entry.dateTimeObject;
								}
	
								currentUri.dateTimeString = entry.dateTimeString;
								currentUri.dateTimeObject = entry.dateTimeObject;
							},
							targetduration: function targetduration() {
								if (!isFinite(entry.duration) || entry.duration < 0) {
									this.trigger('warn', {
										message: 'ignoring invalid target duration: ' + entry.duration
									});
									return;
								}
	
								this.manifest.targetDuration = entry.duration;
								setHoldBack.call(this, this.manifest);
							},
							start: function start() {
								if (!entry.attributes || isNaN(entry.attributes['TIME-OFFSET'])) {
									this.trigger('warn', {
										message: 'ignoring start declaration without appropriate attribute list'
									});
									return;
								}
	
								this.manifest.start = {
									timeOffset: entry.attributes['TIME-OFFSET'],
									precise: entry.attributes.PRECISE
								};
							},
							'cue-out': function cueOut() {
								currentUri.cueOut = entry.data;
							},
							'cue-out-cont': function cueOutCont() {
								currentUri.cueOutCont = entry.data;
							},
							'cue-in': function cueIn() {
								currentUri.cueIn = entry.data;
							},
							'skip': function skip() {
								this.manifest.skip = camelCaseKeys(entry.attributes);
								this.warnOnMissingAttributes_('#EXT-X-SKIP', entry.attributes, ['SKIPPED-SEGMENTS']);
							},
							'part': function part() {
								var _this2 = this;
	
								hasParts = true; // parts are always specifed before a segment
	
								var segmentIndex = this.manifest.segments.length;
								var part = camelCaseKeys(entry.attributes);
								currentUri.parts = currentUri.parts || [];
								currentUri.parts.push(part);
	
								if (part.byterange) {
									if (!part.byterange.hasOwnProperty('offset')) {
										part.byterange.offset = lastPartByterangeEnd;
									}
	
									lastPartByterangeEnd = part.byterange.offset + part.byterange.length;
								}
	
								var partIndex = currentUri.parts.length - 1;
								this.warnOnMissingAttributes_("#EXT-X-PART #" + partIndex + " for segment #" + segmentIndex, entry.attributes, ['URI', 'DURATION']);
	
								if (this.manifest.renditionReports) {
									this.manifest.renditionReports.forEach(function (r, i) {
										if (!r.hasOwnProperty('lastPart')) {
											_this2.trigger('warn', {
												message: "#EXT-X-RENDITION-REPORT #" + i + " lacks required attribute(s): LAST-PART"
											});
										}
									});
								}
							},
							'server-control': function serverControl() {
								var attrs = this.manifest.serverControl = camelCaseKeys(entry.attributes);
	
								if (!attrs.hasOwnProperty('canBlockReload')) {
									attrs.canBlockReload = false;
									this.trigger('info', {
										message: '#EXT-X-SERVER-CONTROL defaulting CAN-BLOCK-RELOAD to false'
									});
								}
	
								setHoldBack.call(this, this.manifest);
	
								if (attrs.canSkipDateranges && !attrs.hasOwnProperty('canSkipUntil')) {
									this.trigger('warn', {
										message: '#EXT-X-SERVER-CONTROL lacks required attribute CAN-SKIP-UNTIL which is required when CAN-SKIP-DATERANGES is set'
									});
								}
							},
							'preload-hint': function preloadHint() {
								// parts are always specifed before a segment
								var segmentIndex = this.manifest.segments.length;
								var hint = camelCaseKeys(entry.attributes);
								var isPart = hint.type && hint.type === 'PART';
								currentUri.preloadHints = currentUri.preloadHints || [];
								currentUri.preloadHints.push(hint);
	
								if (hint.byterange) {
									if (!hint.byterange.hasOwnProperty('offset')) {
										// use last part byterange end or zero if not a part.
										hint.byterange.offset = isPart ? lastPartByterangeEnd : 0;
	
										if (isPart) {
											lastPartByterangeEnd = hint.byterange.offset + hint.byterange.length;
										}
									}
								}
	
								var index = currentUri.preloadHints.length - 1;
								this.warnOnMissingAttributes_("#EXT-X-PRELOAD-HINT #" + index + " for segment #" + segmentIndex, entry.attributes, ['TYPE', 'URI']);
	
								if (!hint.type) {
									return;
								} // search through all preload hints except for the current one for
								// a duplicate type.
	
	
								for (var i = 0; i < currentUri.preloadHints.length - 1; i++) {
									var otherHint = currentUri.preloadHints[i];
	
									if (!otherHint.type) {
										continue;
									}
	
									if (otherHint.type === hint.type) {
										this.trigger('warn', {
											message: "#EXT-X-PRELOAD-HINT #" + index + " for segment #" + segmentIndex + " has the same TYPE " + hint.type + " as preload hint #" + i
										});
									}
								}
							},
							'rendition-report': function renditionReport() {
								var report = camelCaseKeys(entry.attributes);
								this.manifest.renditionReports = this.manifest.renditionReports || [];
								this.manifest.renditionReports.push(report);
								var index = this.manifest.renditionReports.length - 1;
								var required = ['LAST-MSN', 'URI'];
	
								if (hasParts) {
									required.push('LAST-PART');
								}
	
								this.warnOnMissingAttributes_("#EXT-X-RENDITION-REPORT #" + index, entry.attributes, required);
							},
							'part-inf': function partInf() {
								this.manifest.partInf = camelCaseKeys(entry.attributes);
								this.warnOnMissingAttributes_('#EXT-X-PART-INF', entry.attributes, ['PART-TARGET']);
	
								if (this.manifest.partInf.partTarget) {
									this.manifest.partTargetDuration = this.manifest.partInf.partTarget;
								}
	
								setHoldBack.call(this, this.manifest);
							}
						})[entry.tagType] || noop).call(self);
					},
					uri: function uri() {
						currentUri.uri = entry.uri;
						uris.push(currentUri); // if no explicit duration was declared, use the target duration
	
						if (this.manifest.targetDuration && !('duration' in currentUri)) {
							this.trigger('warn', {
								message: 'defaulting segment duration to the target duration'
							});
							currentUri.duration = this.manifest.targetDuration;
						} // annotate with encryption information, if necessary
	
	
						if (_key) {
							currentUri.key = _key;
						}
	
						currentUri.timeline = currentTimeline; // annotate with initialization segment information, if necessary
	
						if (currentMap) {
							currentUri.map = currentMap;
						} // reset the last byterange end as it needs to be 0 between parts
	
	
						lastPartByterangeEnd = 0; // prepare for the next URI
	
						currentUri = {};
					},
					comment: function comment() {// comments are not important for playback
					},
					custom: function custom() {
						// if this is segment-level data attach the output to the segment
						if (entry.segment) {
							currentUri.custom = currentUri.custom || {};
							currentUri.custom[entry.customType] = entry.data; // if this is manifest-level data attach to the top level manifest object
						} else {
							this.manifest.custom = this.manifest.custom || {};
							this.manifest.custom[entry.customType] = entry.data;
						}
					}
				})[entry.type].call(self);
			});
	
			return _this;
		}
	
		var _proto = Parser.prototype;
	
		_proto.warnOnMissingAttributes_ = function warnOnMissingAttributes_(identifier, attributes, required) {
			var missing = [];
			required.forEach(function (key) {
				if (!attributes.hasOwnProperty(key)) {
					missing.push(key);
				}
			});
	
			if (missing.length) {
				this.trigger('warn', {
					message: identifier + " lacks required attribute(s): " + missing.join(', ')
				});
			}
		}
		/**
		 * Parse the input string and update the manifest object.
		 *
		 * @param {string} chunk a potentially incomplete portion of the manifest
		 */
		;
	
		_proto.push = function push(chunk) {
			this.lineStream.push(chunk);
		}
		/**
		 * Flush any remaining input. This can be handy if the last line of an M3U8
		 * manifest did not contain a trailing newline but the file has been
		 * completely received.
		 */
		;
	
		_proto.end = function end() {
			// flush any buffered input
			this.lineStream.push('\n');
			this.trigger('end');
		}
		/**
		 * Add an additional parser for non-standard tags
		 *
		 * @param {Object}   options              a map of options for the added parser
		 * @param {RegExp}   options.expression   a regular expression to match the custom header
		 * @param {string}   options.type         the type to register to the output
		 * @param {Function} [options.dataParser] function to parse the line into an object
		 * @param {boolean}  [options.segment]    should tag data be attached to the segment object
		 */
		;
	
		_proto.addParser = function addParser(options) {
			this.parseStream.addParser(options);
		}
		/**
		 * Add a custom header mapper
		 *
		 * @param {Object}   options
		 * @param {RegExp}   options.expression   a regular expression to match the custom header
		 * @param {Function} options.map          function to translate tag into a different tag
		 */
		;
	
		_proto.addTagMapper = function addTagMapper(options) {
			this.parseStream.addTagMapper(options);
		};
	
		return Parser;
	}(Stream__default['default']);
	
	exports.LineStream = LineStream;
	exports.ParseStream = ParseStream;
	exports.Parser = Parser;
	
	},{"@babel/runtime/helpers/assertThisInitialized":6,"@babel/runtime/helpers/extends":7,"@babel/runtime/helpers/inheritsLoose":8,"@videojs/vhs-utils/cjs/decode-b64-to-uint8-array.js":20,"@videojs/vhs-utils/cjs/stream.js":21}],33:[function(require,module,exports){
	var wrappy = require('wrappy')
	module.exports = wrappy(once)
	module.exports.strict = wrappy(onceStrict)
	
	once.proto = once(function () {
		Object.defineProperty(Function.prototype, 'once', {
			value: function () {
				return once(this)
			},
			configurable: true
		})
	
		Object.defineProperty(Function.prototype, 'onceStrict', {
			value: function () {
				return onceStrict(this)
			},
			configurable: true
		})
	})
	
	function once (fn) {
		var f = function () {
			if (f.called) return f.value
			f.called = true
			return f.value = fn.apply(this, arguments)
		}
		f.called = false
		return f
	}
	
	function onceStrict (fn) {
		var f = function () {
			if (f.called)
				throw new Error(f.onceError)
			f.called = true
			return f.value = fn.apply(this, arguments)
		}
		var name = fn.name || 'Function wrapped with `once`'
		f.onceError = name + " shouldn't be called more than once"
		f.called = false
		return f
	}
	
	},{"wrappy":60}],34:[function(require,module,exports){
	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
			throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
			throw new Error('clearTimeout has not been defined');
	}
	(function () {
			try {
					if (typeof setTimeout === 'function') {
							cachedSetTimeout = setTimeout;
					} else {
							cachedSetTimeout = defaultSetTimout;
					}
			} catch (e) {
					cachedSetTimeout = defaultSetTimout;
			}
			try {
					if (typeof clearTimeout === 'function') {
							cachedClearTimeout = clearTimeout;
					} else {
							cachedClearTimeout = defaultClearTimeout;
					}
			} catch (e) {
					cachedClearTimeout = defaultClearTimeout;
			}
	} ())
	function runTimeout(fun) {
			if (cachedSetTimeout === setTimeout) {
					//normal enviroments in sane situations
					return setTimeout(fun, 0);
			}
			// if setTimeout wasn't available but was latter defined
			if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
					cachedSetTimeout = setTimeout;
					return setTimeout(fun, 0);
			}
			try {
					// when when somebody has screwed with setTimeout but no I.E. maddness
					return cachedSetTimeout(fun, 0);
			} catch(e){
					try {
							// When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
							return cachedSetTimeout.call(null, fun, 0);
					} catch(e){
							// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
							return cachedSetTimeout.call(this, fun, 0);
					}
			}
	
	
	}
	function runClearTimeout(marker) {
			if (cachedClearTimeout === clearTimeout) {
					//normal enviroments in sane situations
					return clearTimeout(marker);
			}
			// if clearTimeout wasn't available but was latter defined
			if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
					cachedClearTimeout = clearTimeout;
					return clearTimeout(marker);
			}
			try {
					// when when somebody has screwed with setTimeout but no I.E. maddness
					return cachedClearTimeout(marker);
			} catch (e){
					try {
							// When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
							return cachedClearTimeout.call(null, marker);
					} catch (e){
							// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
							// Some versions of I.E. have different rules for clearTimeout vs setTimeout
							return cachedClearTimeout.call(this, marker);
					}
			}
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
			if (!draining || !currentQueue) {
					return;
			}
			draining = false;
			if (currentQueue.length) {
					queue = currentQueue.concat(queue);
			} else {
					queueIndex = -1;
			}
			if (queue.length) {
					drainQueue();
			}
	}
	
	function drainQueue() {
			if (draining) {
					return;
			}
			var timeout = runTimeout(cleanUpNextTick);
			draining = true;
	
			var len = queue.length;
			while(len) {
					currentQueue = queue;
					queue = [];
					while (++queueIndex < len) {
							if (currentQueue) {
									currentQueue[queueIndex].run();
							}
					}
					queueIndex = -1;
					len = queue.length;
			}
			currentQueue = null;
			draining = false;
			runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
			var args = new Array(arguments.length - 1);
			if (arguments.length > 1) {
					for (var i = 1; i < arguments.length; i++) {
							args[i - 1] = arguments[i];
					}
			}
			queue.push(new Item(fun, args));
			if (queue.length === 1 && !draining) {
					runTimeout(drainQueue);
			}
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
			this.fun = fun;
			this.array = array;
	}
	Item.prototype.run = function () {
			this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
			throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
			throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };
	
	},{}],35:[function(require,module,exports){
	(function (global){(function (){
	/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
	let promise
	
	module.exports = typeof queueMicrotask === 'function'
		? queueMicrotask.bind(typeof window !== 'undefined' ? window : global)
		// reuse resolved promise, and allocate it lazily
		: cb => (promise || (promise = Promise.resolve()))
			.then(cb)
			.catch(err => setTimeout(() => { throw err }, 0))
	
	}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{}],36:[function(require,module,exports){
	(function (process,global){(function (){
	'use strict'
	
	// limit of Crypto.getRandomValues()
	// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
	var MAX_BYTES = 65536
	
	// Node supports requesting up to this number of bytes
	// https://github.com/nodejs/node/blob/master/lib/internal/crypto/random.js#L48
	var MAX_UINT32 = 4294967295
	
	function oldBrowser () {
		throw new Error('Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11')
	}
	
	var Buffer = require('safe-buffer').Buffer
	var crypto = global.crypto || global.msCrypto
	
	if (crypto && crypto.getRandomValues) {
		module.exports = randomBytes
	} else {
		module.exports = oldBrowser
	}
	
	function randomBytes (size, cb) {
		// phantomjs needs to throw
		if (size > MAX_UINT32) throw new RangeError('requested too many random bytes')
	
		var bytes = Buffer.allocUnsafe(size)
	
		if (size > 0) {  // getRandomValues fails on IE if size == 0
			if (size > MAX_BYTES) { // this is the max bytes crypto.getRandomValues
				// can do at once see https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
				for (var generated = 0; generated < size; generated += MAX_BYTES) {
					// buffer.slice automatically checks if the end is past the end of
					// the buffer so we don't have to here
					crypto.getRandomValues(bytes.slice(generated, generated + MAX_BYTES))
				}
			} else {
				crypto.getRandomValues(bytes)
			}
		}
	
		if (typeof cb === 'function') {
			return process.nextTick(function () {
				cb(null, bytes)
			})
		}
	
		return bytes
	}
	
	}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"_process":34,"safe-buffer":53}],37:[function(require,module,exports){
	'use strict';
	
	function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }
	
	var codes = {};
	
	function createErrorType(code, message, Base) {
		if (!Base) {
			Base = Error;
		}
	
		function getMessage(arg1, arg2, arg3) {
			if (typeof message === 'string') {
				return message;
			} else {
				return message(arg1, arg2, arg3);
			}
		}
	
		var NodeError =
		/*#__PURE__*/
		function (_Base) {
			_inheritsLoose(NodeError, _Base);
	
			function NodeError(arg1, arg2, arg3) {
				return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
			}
	
			return NodeError;
		}(Base);
	
		NodeError.prototype.name = Base.name;
		NodeError.prototype.code = code;
		codes[code] = NodeError;
	} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js
	
	
	function oneOf(expected, thing) {
		if (Array.isArray(expected)) {
			var len = expected.length;
			expected = expected.map(function (i) {
				return String(i);
			});
	
			if (len > 2) {
				return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
			} else if (len === 2) {
				return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
			} else {
				return "of ".concat(thing, " ").concat(expected[0]);
			}
		} else {
			return "of ".concat(thing, " ").concat(String(expected));
		}
	} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
	
	
	function startsWith(str, search, pos) {
		return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
	} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
	
	
	function endsWith(str, search, this_len) {
		if (this_len === undefined || this_len > str.length) {
			this_len = str.length;
		}
	
		return str.substring(this_len - search.length, this_len) === search;
	} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
	
	
	function includes(str, search, start) {
		if (typeof start !== 'number') {
			start = 0;
		}
	
		if (start + search.length > str.length) {
			return false;
		} else {
			return str.indexOf(search, start) !== -1;
		}
	}
	
	createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
		return 'The value "' + value + '" is invalid for option "' + name + '"';
	}, TypeError);
	createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
		// determiner: 'must be' or 'must not be'
		var determiner;
	
		if (typeof expected === 'string' && startsWith(expected, 'not ')) {
			determiner = 'must not be';
			expected = expected.replace(/^not /, '');
		} else {
			determiner = 'must be';
		}
	
		var msg;
	
		if (endsWith(name, ' argument')) {
			// For cases like 'first argument'
			msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
		} else {
			var type = includes(name, '.') ? 'property' : 'argument';
			msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
		}
	
		msg += ". Received type ".concat(typeof actual);
		return msg;
	}, TypeError);
	createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
	createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
		return 'The ' + name + ' method is not implemented';
	});
	createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
	createErrorType('ERR_STREAM_DESTROYED', function (name) {
		return 'Cannot call ' + name + ' after a stream was destroyed';
	});
	createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
	createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
	createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
	createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
	createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
		return 'Unknown encoding: ' + arg;
	}, TypeError);
	createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
	module.exports.codes = codes;
	
	},{}],38:[function(require,module,exports){
	(function (process){(function (){
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.
	'use strict';
	/*<replacement>*/
	
	var objectKeys = Object.keys || function (obj) {
		var keys = [];
	
		for (var key in obj) {
			keys.push(key);
		}
	
		return keys;
	};
	/*</replacement>*/
	
	
	module.exports = Duplex;
	
	var Readable = require('./_stream_readable');
	
	var Writable = require('./_stream_writable');
	
	require('inherits')(Duplex, Readable);
	
	{
		// Allow the keys array to be GC'ed.
		var keys = objectKeys(Writable.prototype);
	
		for (var v = 0; v < keys.length; v++) {
			var method = keys[v];
			if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
		}
	}
	
	function Duplex(options) {
		if (!(this instanceof Duplex)) return new Duplex(options);
		Readable.call(this, options);
		Writable.call(this, options);
		this.allowHalfOpen = true;
	
		if (options) {
			if (options.readable === false) this.readable = false;
			if (options.writable === false) this.writable = false;
	
			if (options.allowHalfOpen === false) {
				this.allowHalfOpen = false;
				this.once('end', onend);
			}
		}
	}
	
	Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
		// making it explicit this property is not enumerable
		// because otherwise some prototype manipulation in
		// userland will fail
		enumerable: false,
		get: function get() {
			return this._writableState.highWaterMark;
		}
	});
	Object.defineProperty(Duplex.prototype, 'writableBuffer', {
		// making it explicit this property is not enumerable
		// because otherwise some prototype manipulation in
		// userland will fail
		enumerable: false,
		get: function get() {
			return this._writableState && this._writableState.getBuffer();
		}
	});
	Object.defineProperty(Duplex.prototype, 'writableLength', {
		// making it explicit this property is not enumerable
		// because otherwise some prototype manipulation in
		// userland will fail
		enumerable: false,
		get: function get() {
			return this._writableState.length;
		}
	}); // the no-half-open enforcer
	
	function onend() {
		// If the writable side ended, then we're ok.
		if (this._writableState.ended) return; // no more data can be written.
		// But allow more writes to happen in this tick.
	
		process.nextTick(onEndNT, this);
	}
	
	function onEndNT(self) {
		self.end();
	}
	
	Object.defineProperty(Duplex.prototype, 'destroyed', {
		// making it explicit this property is not enumerable
		// because otherwise some prototype manipulation in
		// userland will fail
		enumerable: false,
		get: function get() {
			if (this._readableState === undefined || this._writableState === undefined) {
				return false;
			}
	
			return this._readableState.destroyed && this._writableState.destroyed;
		},
		set: function set(value) {
			// we ignore the value if the stream
			// has not been initialized yet
			if (this._readableState === undefined || this._writableState === undefined) {
				return;
			} // backward compatibility, the user is explicitly
			// managing destroyed
	
	
			this._readableState.destroyed = value;
			this._writableState.destroyed = value;
		}
	});
	}).call(this)}).call(this,require('_process'))
	},{"./_stream_readable":40,"./_stream_writable":42,"_process":34,"inherits":31}],39:[function(require,module,exports){
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.
	'use strict';
	
	module.exports = PassThrough;
	
	var Transform = require('./_stream_transform');
	
	require('inherits')(PassThrough, Transform);
	
	function PassThrough(options) {
		if (!(this instanceof PassThrough)) return new PassThrough(options);
		Transform.call(this, options);
	}
	
	PassThrough.prototype._transform = function (chunk, encoding, cb) {
		cb(null, chunk);
	};
	},{"./_stream_transform":41,"inherits":31}],40:[function(require,module,exports){
	(function (process,global){(function (){
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	'use strict';
	
	module.exports = Readable;
	/*<replacement>*/
	
	var Duplex;
	/*</replacement>*/
	
	Readable.ReadableState = ReadableState;
	/*<replacement>*/
	
	var EE = require('events').EventEmitter;
	
	var EElistenerCount = function EElistenerCount(emitter, type) {
		return emitter.listeners(type).length;
	};
	/*</replacement>*/
	
	/*<replacement>*/
	
	
	var Stream = require('./internal/streams/stream');
	/*</replacement>*/
	
	
	var Buffer = require('buffer').Buffer;
	
	var OurUint8Array = global.Uint8Array || function () {};
	
	function _uint8ArrayToBuffer(chunk) {
		return Buffer.from(chunk);
	}
	
	function _isUint8Array(obj) {
		return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}
	/*<replacement>*/
	
	
	var debugUtil = require('util');
	
	var debug;
	
	if (debugUtil && debugUtil.debuglog) {
		debug = debugUtil.debuglog('stream');
	} else {
		debug = function debug() {};
	}
	/*</replacement>*/
	
	
	var BufferList = require('./internal/streams/buffer_list');
	
	var destroyImpl = require('./internal/streams/destroy');
	
	var _require = require('./internal/streams/state'),
			getHighWaterMark = _require.getHighWaterMark;
	
	var _require$codes = require('../errors').codes,
			ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
			ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
			ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
			ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.
	
	
	var StringDecoder;
	var createReadableStreamAsyncIterator;
	var from;
	
	require('inherits')(Readable, Stream);
	
	var errorOrDestroy = destroyImpl.errorOrDestroy;
	var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];
	
	function prependListener(emitter, event, fn) {
		// Sadly this is not cacheable as some libraries bundle their own
		// event emitter implementation with them.
		if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
		// userland ones.  NEVER DO THIS. This is here only because this code needs
		// to continue to work with older versions of Node.js that do not include
		// the prependListener() method. The goal is to eventually remove this hack.
	
		if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
	}
	
	function ReadableState(options, stream, isDuplex) {
		Duplex = Duplex || require('./_stream_duplex');
		options = options || {}; // Duplex streams are both readable and writable, but share
		// the same options object.
		// However, some cases require setting options to different
		// values for the readable and the writable sides of the duplex stream.
		// These options can be provided separately as readableXXX and writableXXX.
	
		if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
		// make all the buffer merging and length checks go away
	
		this.objectMode = !!options.objectMode;
		if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
		// Note: 0 is a valid value, means "don't call _read preemptively ever"
	
		this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
		// linked list can remove elements from the beginning faster than
		// array.shift()
	
		this.buffer = new BufferList();
		this.length = 0;
		this.pipes = null;
		this.pipesCount = 0;
		this.flowing = null;
		this.ended = false;
		this.endEmitted = false;
		this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
		// immediately, or on a later tick.  We set this to true at first, because
		// any actions that shouldn't happen until "later" should generally also
		// not happen before the first read call.
	
		this.sync = true; // whenever we return null, then we set a flag to say
		// that we're awaiting a 'readable' event emission.
	
		this.needReadable = false;
		this.emittedReadable = false;
		this.readableListening = false;
		this.resumeScheduled = false;
		this.paused = true; // Should close be emitted on destroy. Defaults to true.
	
		this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')
	
		this.autoDestroy = !!options.autoDestroy; // has it been destroyed
	
		this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
		// encoding is 'binary' so we have to make this configurable.
		// Everything else in the universe uses 'utf8', though.
	
		this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s
	
		this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled
	
		this.readingMore = false;
		this.decoder = null;
		this.encoding = null;
	
		if (options.encoding) {
			if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
			this.decoder = new StringDecoder(options.encoding);
			this.encoding = options.encoding;
		}
	}
	
	function Readable(options) {
		Duplex = Duplex || require('./_stream_duplex');
		if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
		// the ReadableState constructor, at least with V8 6.5
	
		var isDuplex = this instanceof Duplex;
		this._readableState = new ReadableState(options, this, isDuplex); // legacy
	
		this.readable = true;
	
		if (options) {
			if (typeof options.read === 'function') this._read = options.read;
			if (typeof options.destroy === 'function') this._destroy = options.destroy;
		}
	
		Stream.call(this);
	}
	
	Object.defineProperty(Readable.prototype, 'destroyed', {
		// making it explicit this property is not enumerable
		// because otherwise some prototype manipulation in
		// userland will fail
		enumerable: false,
		get: function get() {
			if (this._readableState === undefined) {
				return false;
			}
	
			return this._readableState.destroyed;
		},
		set: function set(value) {
			// we ignore the value if the stream
			// has not been initialized yet
			if (!this._readableState) {
				return;
			} // backward compatibility, the user is explicitly
			// managing destroyed
	
	
			this._readableState.destroyed = value;
		}
	});
	Readable.prototype.destroy = destroyImpl.destroy;
	Readable.prototype._undestroy = destroyImpl.undestroy;
	
	Readable.prototype._destroy = function (err, cb) {
		cb(err);
	}; // Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	
	
	Readable.prototype.push = function (chunk, encoding) {
		var state = this._readableState;
		var skipChunkCheck;
	
		if (!state.objectMode) {
			if (typeof chunk === 'string') {
				encoding = encoding || state.defaultEncoding;
	
				if (encoding !== state.encoding) {
					chunk = Buffer.from(chunk, encoding);
					encoding = '';
				}
	
				skipChunkCheck = true;
			}
		} else {
			skipChunkCheck = true;
		}
	
		return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
	}; // Unshift should *always* be something directly out of read()
	
	
	Readable.prototype.unshift = function (chunk) {
		return readableAddChunk(this, chunk, null, true, false);
	};
	
	function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
		debug('readableAddChunk', chunk);
		var state = stream._readableState;
	
		if (chunk === null) {
			state.reading = false;
			onEofChunk(stream, state);
		} else {
			var er;
			if (!skipChunkCheck) er = chunkInvalid(state, chunk);
	
			if (er) {
				errorOrDestroy(stream, er);
			} else if (state.objectMode || chunk && chunk.length > 0) {
				if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
					chunk = _uint8ArrayToBuffer(chunk);
				}
	
				if (addToFront) {
					if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
				} else if (state.ended) {
					errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
				} else if (state.destroyed) {
					return false;
				} else {
					state.reading = false;
	
					if (state.decoder && !encoding) {
						chunk = state.decoder.write(chunk);
						if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
					} else {
						addChunk(stream, state, chunk, false);
					}
				}
			} else if (!addToFront) {
				state.reading = false;
				maybeReadMore(stream, state);
			}
		} // We can push more data if we are below the highWaterMark.
		// Also, if we have no data yet, we can stand some more bytes.
		// This is to work around cases where hwm=0, such as the repl.
	
	
		return !state.ended && (state.length < state.highWaterMark || state.length === 0);
	}
	
	function addChunk(stream, state, chunk, addToFront) {
		if (state.flowing && state.length === 0 && !state.sync) {
			state.awaitDrain = 0;
			stream.emit('data', chunk);
		} else {
			// update the buffer info.
			state.length += state.objectMode ? 1 : chunk.length;
			if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
			if (state.needReadable) emitReadable(stream);
		}
	
		maybeReadMore(stream, state);
	}
	
	function chunkInvalid(state, chunk) {
		var er;
	
		if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
			er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
		}
	
		return er;
	}
	
	Readable.prototype.isPaused = function () {
		return this._readableState.flowing === false;
	}; // backwards compatibility.
	
	
	Readable.prototype.setEncoding = function (enc) {
		if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
		var decoder = new StringDecoder(enc);
		this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8
	
		this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:
	
		var p = this._readableState.buffer.head;
		var content = '';
	
		while (p !== null) {
			content += decoder.write(p.data);
			p = p.next;
		}
	
		this._readableState.buffer.clear();
	
		if (content !== '') this._readableState.buffer.push(content);
		this._readableState.length = content.length;
		return this;
	}; // Don't raise the hwm > 1GB
	
	
	var MAX_HWM = 0x40000000;
	
	function computeNewHighWaterMark(n) {
		if (n >= MAX_HWM) {
			// TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
			n = MAX_HWM;
		} else {
			// Get the next highest power of 2 to prevent increasing hwm excessively in
			// tiny amounts
			n--;
			n |= n >>> 1;
			n |= n >>> 2;
			n |= n >>> 4;
			n |= n >>> 8;
			n |= n >>> 16;
			n++;
		}
	
		return n;
	} // This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	
	
	function howMuchToRead(n, state) {
		if (n <= 0 || state.length === 0 && state.ended) return 0;
		if (state.objectMode) return 1;
	
		if (n !== n) {
			// Only flow one buffer at a time
			if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
		} // If we're asking for more than the current hwm, then raise the hwm.
	
	
		if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
		if (n <= state.length) return n; // Don't have enough
	
		if (!state.ended) {
			state.needReadable = true;
			return 0;
		}
	
		return state.length;
	} // you can override either this method, or the async _read(n) below.
	
	
	Readable.prototype.read = function (n) {
		debug('read', n);
		n = parseInt(n, 10);
		var state = this._readableState;
		var nOrig = n;
		if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
		// already have a bunch of data in the buffer, then just trigger
		// the 'readable' event and move on.
	
		if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
			debug('read: emitReadable', state.length, state.ended);
			if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
			return null;
		}
	
		n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.
	
		if (n === 0 && state.ended) {
			if (state.length === 0) endReadable(this);
			return null;
		} // All the actual chunk generation logic needs to be
		// *below* the call to _read.  The reason is that in certain
		// synthetic stream cases, such as passthrough streams, _read
		// may be a completely synchronous operation which may change
		// the state of the read buffer, providing enough data when
		// before there was *not* enough.
		//
		// So, the steps are:
		// 1. Figure out what the state of things will be after we do
		// a read from the buffer.
		//
		// 2. If that resulting state will trigger a _read, then call _read.
		// Note that this may be asynchronous, or synchronous.  Yes, it is
		// deeply ugly to write APIs this way, but that still doesn't mean
		// that the Readable class should behave improperly, as streams are
		// designed to be sync/async agnostic.
		// Take note if the _read call is sync or async (ie, if the read call
		// has returned yet), so that we know whether or not it's safe to emit
		// 'readable' etc.
		//
		// 3. Actually pull the requested chunks out of the buffer and return.
		// if we need a readable event, then we need to do some reading.
	
	
		var doRead = state.needReadable;
		debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some
	
		if (state.length === 0 || state.length - n < state.highWaterMark) {
			doRead = true;
			debug('length less than watermark', doRead);
		} // however, if we've ended, then there's no point, and if we're already
		// reading, then it's unnecessary.
	
	
		if (state.ended || state.reading) {
			doRead = false;
			debug('reading or ended', doRead);
		} else if (doRead) {
			debug('do read');
			state.reading = true;
			state.sync = true; // if the length is currently zero, then we *need* a readable event.
	
			if (state.length === 0) state.needReadable = true; // call internal read method
	
			this._read(state.highWaterMark);
	
			state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
			// and we need to re-evaluate how much data we can return to the user.
	
			if (!state.reading) n = howMuchToRead(nOrig, state);
		}
	
		var ret;
		if (n > 0) ret = fromList(n, state);else ret = null;
	
		if (ret === null) {
			state.needReadable = state.length <= state.highWaterMark;
			n = 0;
		} else {
			state.length -= n;
			state.awaitDrain = 0;
		}
	
		if (state.length === 0) {
			// If we have nothing in the buffer, then we want to know
			// as soon as we *do* get something into the buffer.
			if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.
	
			if (nOrig !== n && state.ended) endReadable(this);
		}
	
		if (ret !== null) this.emit('data', ret);
		return ret;
	};
	
	function onEofChunk(stream, state) {
		debug('onEofChunk');
		if (state.ended) return;
	
		if (state.decoder) {
			var chunk = state.decoder.end();
	
			if (chunk && chunk.length) {
				state.buffer.push(chunk);
				state.length += state.objectMode ? 1 : chunk.length;
			}
		}
	
		state.ended = true;
	
		if (state.sync) {
			// if we are sync, wait until next tick to emit the data.
			// Otherwise we risk emitting data in the flow()
			// the readable code triggers during a read() call
			emitReadable(stream);
		} else {
			// emit 'readable' now to make sure it gets picked up.
			state.needReadable = false;
	
			if (!state.emittedReadable) {
				state.emittedReadable = true;
				emitReadable_(stream);
			}
		}
	} // Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	
	
	function emitReadable(stream) {
		var state = stream._readableState;
		debug('emitReadable', state.needReadable, state.emittedReadable);
		state.needReadable = false;
	
		if (!state.emittedReadable) {
			debug('emitReadable', state.flowing);
			state.emittedReadable = true;
			process.nextTick(emitReadable_, stream);
		}
	}
	
	function emitReadable_(stream) {
		var state = stream._readableState;
		debug('emitReadable_', state.destroyed, state.length, state.ended);
	
		if (!state.destroyed && (state.length || state.ended)) {
			stream.emit('readable');
			state.emittedReadable = false;
		} // The stream needs another readable event if
		// 1. It is not flowing, as the flow mechanism will take
		//    care of it.
		// 2. It is not ended.
		// 3. It is below the highWaterMark, so we can schedule
		//    another readable later.
	
	
		state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
		flow(stream);
	} // at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	
	
	function maybeReadMore(stream, state) {
		if (!state.readingMore) {
			state.readingMore = true;
			process.nextTick(maybeReadMore_, stream, state);
		}
	}
	
	function maybeReadMore_(stream, state) {
		// Attempt to read more data if we should.
		//
		// The conditions for reading more data are (one of):
		// - Not enough data buffered (state.length < state.highWaterMark). The loop
		//   is responsible for filling the buffer with enough data if such data
		//   is available. If highWaterMark is 0 and we are not in the flowing mode
		//   we should _not_ attempt to buffer any extra data. We'll get more data
		//   when the stream consumer calls read() instead.
		// - No data in the buffer, and the stream is in flowing mode. In this mode
		//   the loop below is responsible for ensuring read() is called. Failing to
		//   call read here would abort the flow and there's no other mechanism for
		//   continuing the flow if the stream consumer has just subscribed to the
		//   'data' event.
		//
		// In addition to the above conditions to keep reading data, the following
		// conditions prevent the data from being read:
		// - The stream has ended (state.ended).
		// - There is already a pending 'read' operation (state.reading). This is a
		//   case where the the stream has called the implementation defined _read()
		//   method, but they are processing the call asynchronously and have _not_
		//   called push() with new data. In this case we skip performing more
		//   read()s. The execution ends in this method again after the _read() ends
		//   up calling push() with more data.
		while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
			var len = state.length;
			debug('maybeReadMore read 0');
			stream.read(0);
			if (len === state.length) // didn't get any data, stop spinning.
				break;
		}
	
		state.readingMore = false;
	} // abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	
	
	Readable.prototype._read = function (n) {
		errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
	};
	
	Readable.prototype.pipe = function (dest, pipeOpts) {
		var src = this;
		var state = this._readableState;
	
		switch (state.pipesCount) {
			case 0:
				state.pipes = dest;
				break;
	
			case 1:
				state.pipes = [state.pipes, dest];
				break;
	
			default:
				state.pipes.push(dest);
				break;
		}
	
		state.pipesCount += 1;
		debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
		var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
		var endFn = doEnd ? onend : unpipe;
		if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
		dest.on('unpipe', onunpipe);
	
		function onunpipe(readable, unpipeInfo) {
			debug('onunpipe');
	
			if (readable === src) {
				if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
					unpipeInfo.hasUnpiped = true;
					cleanup();
				}
			}
		}
	
		function onend() {
			debug('onend');
			dest.end();
		} // when the dest drains, it reduces the awaitDrain counter
		// on the source.  This would be more elegant with a .once()
		// handler in flow(), but adding and removing repeatedly is
		// too slow.
	
	
		var ondrain = pipeOnDrain(src);
		dest.on('drain', ondrain);
		var cleanedUp = false;
	
		function cleanup() {
			debug('cleanup'); // cleanup event handlers once the pipe is broken
	
			dest.removeListener('close', onclose);
			dest.removeListener('finish', onfinish);
			dest.removeListener('drain', ondrain);
			dest.removeListener('error', onerror);
			dest.removeListener('unpipe', onunpipe);
			src.removeListener('end', onend);
			src.removeListener('end', unpipe);
			src.removeListener('data', ondata);
			cleanedUp = true; // if the reader is waiting for a drain event from this
			// specific writer, then it would cause it to never start
			// flowing again.
			// So, if this is awaiting a drain, then we just call it now.
			// If we don't know, then assume that we are waiting for one.
	
			if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
		}
	
		src.on('data', ondata);
	
		function ondata(chunk) {
			debug('ondata');
			var ret = dest.write(chunk);
			debug('dest.write', ret);
	
			if (ret === false) {
				// If the user unpiped during `dest.write()`, it is possible
				// to get stuck in a permanently paused state if that write
				// also returned false.
				// => Check whether `dest` is still a piping destination.
				if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
					debug('false write response, pause', state.awaitDrain);
					state.awaitDrain++;
				}
	
				src.pause();
			}
		} // if the dest has an error, then stop piping into it.
		// however, don't suppress the throwing behavior for this.
	
	
		function onerror(er) {
			debug('onerror', er);
			unpipe();
			dest.removeListener('error', onerror);
			if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
		} // Make sure our error handler is attached before userland ones.
	
	
		prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.
	
		function onclose() {
			dest.removeListener('finish', onfinish);
			unpipe();
		}
	
		dest.once('close', onclose);
	
		function onfinish() {
			debug('onfinish');
			dest.removeListener('close', onclose);
			unpipe();
		}
	
		dest.once('finish', onfinish);
	
		function unpipe() {
			debug('unpipe');
			src.unpipe(dest);
		} // tell the dest that it's being piped to
	
	
		dest.emit('pipe', src); // start the flow if it hasn't been started already.
	
		if (!state.flowing) {
			debug('pipe resume');
			src.resume();
		}
	
		return dest;
	};
	
	function pipeOnDrain(src) {
		return function pipeOnDrainFunctionResult() {
			var state = src._readableState;
			debug('pipeOnDrain', state.awaitDrain);
			if (state.awaitDrain) state.awaitDrain--;
	
			if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
				state.flowing = true;
				flow(src);
			}
		};
	}
	
	Readable.prototype.unpipe = function (dest) {
		var state = this._readableState;
		var unpipeInfo = {
			hasUnpiped: false
		}; // if we're not piping anywhere, then do nothing.
	
		if (state.pipesCount === 0) return this; // just one destination.  most common case.
	
		if (state.pipesCount === 1) {
			// passed in one, but it's not the right one.
			if (dest && dest !== state.pipes) return this;
			if (!dest) dest = state.pipes; // got a match.
	
			state.pipes = null;
			state.pipesCount = 0;
			state.flowing = false;
			if (dest) dest.emit('unpipe', this, unpipeInfo);
			return this;
		} // slow case. multiple pipe destinations.
	
	
		if (!dest) {
			// remove all.
			var dests = state.pipes;
			var len = state.pipesCount;
			state.pipes = null;
			state.pipesCount = 0;
			state.flowing = false;
	
			for (var i = 0; i < len; i++) {
				dests[i].emit('unpipe', this, {
					hasUnpiped: false
				});
			}
	
			return this;
		} // try to find the right one.
	
	
		var index = indexOf(state.pipes, dest);
		if (index === -1) return this;
		state.pipes.splice(index, 1);
		state.pipesCount -= 1;
		if (state.pipesCount === 1) state.pipes = state.pipes[0];
		dest.emit('unpipe', this, unpipeInfo);
		return this;
	}; // set up data events if they are asked for
	// Ensure readable listeners eventually get something
	
	
	Readable.prototype.on = function (ev, fn) {
		var res = Stream.prototype.on.call(this, ev, fn);
		var state = this._readableState;
	
		if (ev === 'data') {
			// update readableListening so that resume() may be a no-op
			// a few lines down. This is needed to support once('readable').
			state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused
	
			if (state.flowing !== false) this.resume();
		} else if (ev === 'readable') {
			if (!state.endEmitted && !state.readableListening) {
				state.readableListening = state.needReadable = true;
				state.flowing = false;
				state.emittedReadable = false;
				debug('on readable', state.length, state.reading);
	
				if (state.length) {
					emitReadable(this);
				} else if (!state.reading) {
					process.nextTick(nReadingNextTick, this);
				}
			}
		}
	
		return res;
	};
	
	Readable.prototype.addListener = Readable.prototype.on;
	
	Readable.prototype.removeListener = function (ev, fn) {
		var res = Stream.prototype.removeListener.call(this, ev, fn);
	
		if (ev === 'readable') {
			// We need to check if there is someone still listening to
			// readable and reset the state. However this needs to happen
			// after readable has been emitted but before I/O (nextTick) to
			// support once('readable', fn) cycles. This means that calling
			// resume within the same tick will have no
			// effect.
			process.nextTick(updateReadableListening, this);
		}
	
		return res;
	};
	
	Readable.prototype.removeAllListeners = function (ev) {
		var res = Stream.prototype.removeAllListeners.apply(this, arguments);
	
		if (ev === 'readable' || ev === undefined) {
			// We need to check if there is someone still listening to
			// readable and reset the state. However this needs to happen
			// after readable has been emitted but before I/O (nextTick) to
			// support once('readable', fn) cycles. This means that calling
			// resume within the same tick will have no
			// effect.
			process.nextTick(updateReadableListening, this);
		}
	
		return res;
	};
	
	function updateReadableListening(self) {
		var state = self._readableState;
		state.readableListening = self.listenerCount('readable') > 0;
	
		if (state.resumeScheduled && !state.paused) {
			// flowing needs to be set to true now, otherwise
			// the upcoming resume will not flow.
			state.flowing = true; // crude way to check if we should resume
		} else if (self.listenerCount('data') > 0) {
			self.resume();
		}
	}
	
	function nReadingNextTick(self) {
		debug('readable nexttick read 0');
		self.read(0);
	} // pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	
	
	Readable.prototype.resume = function () {
		var state = this._readableState;
	
		if (!state.flowing) {
			debug('resume'); // we flow only if there is no one listening
			// for readable, but we still have to call
			// resume()
	
			state.flowing = !state.readableListening;
			resume(this, state);
		}
	
		state.paused = false;
		return this;
	};
	
	function resume(stream, state) {
		if (!state.resumeScheduled) {
			state.resumeScheduled = true;
			process.nextTick(resume_, stream, state);
		}
	}
	
	function resume_(stream, state) {
		debug('resume', state.reading);
	
		if (!state.reading) {
			stream.read(0);
		}
	
		state.resumeScheduled = false;
		stream.emit('resume');
		flow(stream);
		if (state.flowing && !state.reading) stream.read(0);
	}
	
	Readable.prototype.pause = function () {
		debug('call pause flowing=%j', this._readableState.flowing);
	
		if (this._readableState.flowing !== false) {
			debug('pause');
			this._readableState.flowing = false;
			this.emit('pause');
		}
	
		this._readableState.paused = true;
		return this;
	};
	
	function flow(stream) {
		var state = stream._readableState;
		debug('flow', state.flowing);
	
		while (state.flowing && stream.read() !== null) {
			;
		}
	} // wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	
	
	Readable.prototype.wrap = function (stream) {
		var _this = this;
	
		var state = this._readableState;
		var paused = false;
		stream.on('end', function () {
			debug('wrapped end');
	
			if (state.decoder && !state.ended) {
				var chunk = state.decoder.end();
				if (chunk && chunk.length) _this.push(chunk);
			}
	
			_this.push(null);
		});
		stream.on('data', function (chunk) {
			debug('wrapped data');
			if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode
	
			if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;
	
			var ret = _this.push(chunk);
	
			if (!ret) {
				paused = true;
				stream.pause();
			}
		}); // proxy all the other methods.
		// important when wrapping filters and duplexes.
	
		for (var i in stream) {
			if (this[i] === undefined && typeof stream[i] === 'function') {
				this[i] = function methodWrap(method) {
					return function methodWrapReturnFunction() {
						return stream[method].apply(stream, arguments);
					};
				}(i);
			}
		} // proxy certain important events.
	
	
		for (var n = 0; n < kProxyEvents.length; n++) {
			stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
		} // when we try to consume some more bytes, simply unpause the
		// underlying stream.
	
	
		this._read = function (n) {
			debug('wrapped _read', n);
	
			if (paused) {
				paused = false;
				stream.resume();
			}
		};
	
		return this;
	};
	
	if (typeof Symbol === 'function') {
		Readable.prototype[Symbol.asyncIterator] = function () {
			if (createReadableStreamAsyncIterator === undefined) {
				createReadableStreamAsyncIterator = require('./internal/streams/async_iterator');
			}
	
			return createReadableStreamAsyncIterator(this);
		};
	}
	
	Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
		// making it explicit this property is not enumerable
		// because otherwise some prototype manipulation in
		// userland will fail
		enumerable: false,
		get: function get() {
			return this._readableState.highWaterMark;
		}
	});
	Object.defineProperty(Readable.prototype, 'readableBuffer', {
		// making it explicit this property is not enumerable
		// because otherwise some prototype manipulation in
		// userland will fail
		enumerable: false,
		get: function get() {
			return this._readableState && this._readableState.buffer;
		}
	});
	Object.defineProperty(Readable.prototype, 'readableFlowing', {
		// making it explicit this property is not enumerable
		// because otherwise some prototype manipulation in
		// userland will fail
		enumerable: false,
		get: function get() {
			return this._readableState.flowing;
		},
		set: function set(state) {
			if (this._readableState) {
				this._readableState.flowing = state;
			}
		}
	}); // exposed for testing purposes only.
	
	Readable._fromList = fromList;
	Object.defineProperty(Readable.prototype, 'readableLength', {
		// making it explicit this property is not enumerable
		// because otherwise some prototype manipulation in
		// userland will fail
		enumerable: false,
		get: function get() {
			return this._readableState.length;
		}
	}); // Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	
	function fromList(n, state) {
		// nothing buffered
		if (state.length === 0) return null;
		var ret;
		if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
			// read it all, truncate the list
			if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
			state.buffer.clear();
		} else {
			// read part of list
			ret = state.buffer.consume(n, state.decoder);
		}
		return ret;
	}
	
	function endReadable(stream) {
		var state = stream._readableState;
		debug('endReadable', state.endEmitted);
	
		if (!state.endEmitted) {
			state.ended = true;
			process.nextTick(endReadableNT, state, stream);
		}
	}
	
	function endReadableNT(state, stream) {
		debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.
	
		if (!state.endEmitted && state.length === 0) {
			state.endEmitted = true;
			stream.readable = false;
			stream.emit('end');
	
			if (state.autoDestroy) {
				// In case of duplex streams we need a way to detect
				// if the writable side is ready for autoDestroy as well
				var wState = stream._writableState;
	
				if (!wState || wState.autoDestroy && wState.finished) {
					stream.destroy();
				}
			}
		}
	}
	
	if (typeof Symbol === 'function') {
		Readable.from = function (iterable, opts) {
			if (from === undefined) {
				from = require('./internal/streams/from');
			}
	
			return from(Readable, iterable, opts);
		};
	}
	
	function indexOf(xs, x) {
		for (var i = 0, l = xs.length; i < l; i++) {
			if (xs[i] === x) return i;
		}
	
		return -1;
	}
	}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"../errors":37,"./_stream_duplex":38,"./internal/streams/async_iterator":43,"./internal/streams/buffer_list":44,"./internal/streams/destroy":45,"./internal/streams/from":47,"./internal/streams/state":49,"./internal/streams/stream":50,"_process":34,"buffer":"buffer","events":"events","inherits":31,"string_decoder/":58,"util":26}],41:[function(require,module,exports){
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.
	'use strict';
	
	module.exports = Transform;
	
	var _require$codes = require('../errors').codes,
			ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
			ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
			ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,
			ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
	
	var Duplex = require('./_stream_duplex');
	
	require('inherits')(Transform, Duplex);
	
	function afterTransform(er, data) {
		var ts = this._transformState;
		ts.transforming = false;
		var cb = ts.writecb;
	
		if (cb === null) {
			return this.emit('error', new ERR_MULTIPLE_CALLBACK());
		}
	
		ts.writechunk = null;
		ts.writecb = null;
		if (data != null) // single equals check for both `null` and `undefined`
			this.push(data);
		cb(er);
		var rs = this._readableState;
		rs.reading = false;
	
		if (rs.needReadable || rs.length < rs.highWaterMark) {
			this._read(rs.highWaterMark);
		}
	}
	
	function Transform(options) {
		if (!(this instanceof Transform)) return new Transform(options);
		Duplex.call(this, options);
		this._transformState = {
			afterTransform: afterTransform.bind(this),
			needTransform: false,
			transforming: false,
			writecb: null,
			writechunk: null,
			writeencoding: null
		}; // start out asking for a readable event once data is transformed.
	
		this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
		// that Readable wants before the first _read call, so unset the
		// sync guard flag.
	
		this._readableState.sync = false;
	
		if (options) {
			if (typeof options.transform === 'function') this._transform = options.transform;
			if (typeof options.flush === 'function') this._flush = options.flush;
		} // When the writable side finishes, then flush out anything remaining.
	
	
		this.on('prefinish', prefinish);
	}
	
	function prefinish() {
		var _this = this;
	
		if (typeof this._flush === 'function' && !this._readableState.destroyed) {
			this._flush(function (er, data) {
				done(_this, er, data);
			});
		} else {
			done(this, null, null);
		}
	}
	
	Transform.prototype.push = function (chunk, encoding) {
		this._transformState.needTransform = false;
		return Duplex.prototype.push.call(this, chunk, encoding);
	}; // This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	
	
	Transform.prototype._transform = function (chunk, encoding, cb) {
		cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
	};
	
	Transform.prototype._write = function (chunk, encoding, cb) {
		var ts = this._transformState;
		ts.writecb = cb;
		ts.writechunk = chunk;
		ts.writeencoding = encoding;
	
		if (!ts.transforming) {
			var rs = this._readableState;
			if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
		}
	}; // Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	
	
	Transform.prototype._read = function (n) {
		var ts = this._transformState;
	
		if (ts.writechunk !== null && !ts.transforming) {
			ts.transforming = true;
	
			this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
		} else {
			// mark that we need a transform, so that any data that comes in
			// will get processed, now that we've asked for it.
			ts.needTransform = true;
		}
	};
	
	Transform.prototype._destroy = function (err, cb) {
		Duplex.prototype._destroy.call(this, err, function (err2) {
			cb(err2);
		});
	};
	
	function done(stream, er, data) {
		if (er) return stream.emit('error', er);
		if (data != null) // single equals check for both `null` and `undefined`
			stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
		// if there's nothing in the write buffer, then that means
		// that nothing more will ever be provided
	
		if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
		if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
		return stream.push(null);
	}
	},{"../errors":37,"./_stream_duplex":38,"inherits":31}],42:[function(require,module,exports){
	(function (process,global){(function (){
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, encoding, cb), and it'll handle all
	// the drain event emission and buffering.
	'use strict';
	
	module.exports = Writable;
	/* <replacement> */
	
	function WriteReq(chunk, encoding, cb) {
		this.chunk = chunk;
		this.encoding = encoding;
		this.callback = cb;
		this.next = null;
	} // It seems a linked list but it is not
	// there will be only 2 of these for each stream
	
	
	function CorkedRequest(state) {
		var _this = this;
	
		this.next = null;
		this.entry = null;
	
		this.finish = function () {
			onCorkedFinish(_this, state);
		};
	}
	/* </replacement> */
	
	/*<replacement>*/
	
	
	var Duplex;
	/*</replacement>*/
	
	Writable.WritableState = WritableState;
	/*<replacement>*/
	
	var internalUtil = {
		deprecate: require('util-deprecate')
	};
	/*</replacement>*/
	
	/*<replacement>*/
	
	var Stream = require('./internal/streams/stream');
	/*</replacement>*/
	
	
	var Buffer = require('buffer').Buffer;
	
	var OurUint8Array = global.Uint8Array || function () {};
	
	function _uint8ArrayToBuffer(chunk) {
		return Buffer.from(chunk);
	}
	
	function _isUint8Array(obj) {
		return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}
	
	var destroyImpl = require('./internal/streams/destroy');
	
	var _require = require('./internal/streams/state'),
			getHighWaterMark = _require.getHighWaterMark;
	
	var _require$codes = require('../errors').codes,
			ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
			ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
			ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
			ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
			ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
			ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
			ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
			ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
	
	var errorOrDestroy = destroyImpl.errorOrDestroy;
	
	require('inherits')(Writable, Stream);
	
	function nop() {}
	
	function WritableState(options, stream, isDuplex) {
		Duplex = Duplex || require('./_stream_duplex');
		options = options || {}; // Duplex streams are both readable and writable, but share
		// the same options object.
		// However, some cases require setting options to different
		// values for the readable and the writable sides of the duplex stream,
		// e.g. options.readableObjectMode vs. options.writableObjectMode, etc.
	
		if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
		// contains buffers or objects.
	
		this.objectMode = !!options.objectMode;
		if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
		// Note: 0 is a valid value, means that we always return false if
		// the entire buffer is not flushed immediately on write()
	
		this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called
	
		this.finalCalled = false; // drain event flag.
	
		this.needDrain = false; // at the start of calling end()
	
		this.ending = false; // when end() has been called, and returned
	
		this.ended = false; // when 'finish' is emitted
	
		this.finished = false; // has it been destroyed
	
		this.destroyed = false; // should we decode strings into buffers before passing to _write?
		// this is here so that some node-core streams can optimize string
		// handling at a lower level.
	
		var noDecode = options.decodeStrings === false;
		this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
		// encoding is 'binary' so we have to make this configurable.
		// Everything else in the universe uses 'utf8', though.
	
		this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
		// of how much we're waiting to get pushed to some underlying
		// socket or file.
	
		this.length = 0; // a flag to see when we're in the middle of a write.
	
		this.writing = false; // when true all writes will be buffered until .uncork() call
	
		this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
		// or on a later tick.  We set this to true at first, because any
		// actions that shouldn't happen until "later" should generally also
		// not happen before the first write call.
	
		this.sync = true; // a flag to know if we're processing previously buffered items, which
		// may call the _write() callback in the same tick, so that we don't
		// end up in an overlapped onwrite situation.
	
		this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)
	
		this.onwrite = function (er) {
			onwrite(stream, er);
		}; // the callback that the user supplies to write(chunk,encoding,cb)
	
	
		this.writecb = null; // the amount that is being written when _write is called.
	
		this.writelen = 0;
		this.bufferedRequest = null;
		this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
		// this must be 0 before 'finish' can be emitted
	
		this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
		// This is relevant for synchronous Transform streams
	
		this.prefinished = false; // True if the error was already emitted and should not be thrown again
	
		this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.
	
		this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')
	
		this.autoDestroy = !!options.autoDestroy; // count buffered requests
	
		this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
		// one allocated and free to use, and we maintain at most two
	
		this.corkedRequestsFree = new CorkedRequest(this);
	}
	
	WritableState.prototype.getBuffer = function getBuffer() {
		var current = this.bufferedRequest;
		var out = [];
	
		while (current) {
			out.push(current);
			current = current.next;
		}
	
		return out;
	};
	
	(function () {
		try {
			Object.defineProperty(WritableState.prototype, 'buffer', {
				get: internalUtil.deprecate(function writableStateBufferGetter() {
					return this.getBuffer();
				}, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
			});
		} catch (_) {}
	})(); // Test _writableState for inheritance to account for Duplex streams,
	// whose prototype chain only points to Readable.
	
	
	var realHasInstance;
	
	if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
		realHasInstance = Function.prototype[Symbol.hasInstance];
		Object.defineProperty(Writable, Symbol.hasInstance, {
			value: function value(object) {
				if (realHasInstance.call(this, object)) return true;
				if (this !== Writable) return false;
				return object && object._writableState instanceof WritableState;
			}
		});
	} else {
		realHasInstance = function realHasInstance(object) {
			return object instanceof this;
		};
	}
	
	function Writable(options) {
		Duplex = Duplex || require('./_stream_duplex'); // Writable ctor is applied to Duplexes, too.
		// `realHasInstance` is necessary because using plain `instanceof`
		// would return false, as no `_writableState` property is attached.
		// Trying to use the custom `instanceof` for Writable here will also break the
		// Node.js LazyTransform implementation, which has a non-trivial getter for
		// `_writableState` that would lead to infinite recursion.
		// Checking for a Stream.Duplex instance is faster here instead of inside
		// the WritableState constructor, at least with V8 6.5
	
		var isDuplex = this instanceof Duplex;
		if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
		this._writableState = new WritableState(options, this, isDuplex); // legacy.
	
		this.writable = true;
	
		if (options) {
			if (typeof options.write === 'function') this._write = options.write;
			if (typeof options.writev === 'function') this._writev = options.writev;
			if (typeof options.destroy === 'function') this._destroy = options.destroy;
			if (typeof options.final === 'function') this._final = options.final;
		}
	
		Stream.call(this);
	} // Otherwise people can pipe Writable streams, which is just wrong.
	
	
	Writable.prototype.pipe = function () {
		errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
	};
	
	function writeAfterEnd(stream, cb) {
		var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb
	
		errorOrDestroy(stream, er);
		process.nextTick(cb, er);
	} // Checks that a user-supplied chunk is valid, especially for the particular
	// mode the stream is in. Currently this means that `null` is never accepted
	// and undefined/non-string values are only allowed in object mode.
	
	
	function validChunk(stream, state, chunk, cb) {
		var er;
	
		if (chunk === null) {
			er = new ERR_STREAM_NULL_VALUES();
		} else if (typeof chunk !== 'string' && !state.objectMode) {
			er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
		}
	
		if (er) {
			errorOrDestroy(stream, er);
			process.nextTick(cb, er);
			return false;
		}
	
		return true;
	}
	
	Writable.prototype.write = function (chunk, encoding, cb) {
		var state = this._writableState;
		var ret = false;
	
		var isBuf = !state.objectMode && _isUint8Array(chunk);
	
		if (isBuf && !Buffer.isBuffer(chunk)) {
			chunk = _uint8ArrayToBuffer(chunk);
		}
	
		if (typeof encoding === 'function') {
			cb = encoding;
			encoding = null;
		}
	
		if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
		if (typeof cb !== 'function') cb = nop;
		if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
			state.pendingcb++;
			ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
		}
		return ret;
	};
	
	Writable.prototype.cork = function () {
		this._writableState.corked++;
	};
	
	Writable.prototype.uncork = function () {
		var state = this._writableState;
	
		if (state.corked) {
			state.corked--;
			if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
		}
	};
	
	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
		// node::ParseEncoding() requires lower case.
		if (typeof encoding === 'string') encoding = encoding.toLowerCase();
		if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
		this._writableState.defaultEncoding = encoding;
		return this;
	};
	
	Object.defineProperty(Writable.prototype, 'writableBuffer', {
		// making it explicit this property is not enumerable
		// because otherwise some prototype manipulation in
		// userland will fail
		enumerable: false,
		get: function get() {
			return this._writableState && this._writableState.getBuffer();
		}
	});
	
	function decodeChunk(state, chunk, encoding) {
		if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
			chunk = Buffer.from(chunk, encoding);
		}
	
		return chunk;
	}
	
	Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
		// making it explicit this property is not enumerable
		// because otherwise some prototype manipulation in
		// userland will fail
		enumerable: false,
		get: function get() {
			return this._writableState.highWaterMark;
		}
	}); // if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	
	function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
		if (!isBuf) {
			var newChunk = decodeChunk(state, chunk, encoding);
	
			if (chunk !== newChunk) {
				isBuf = true;
				encoding = 'buffer';
				chunk = newChunk;
			}
		}
	
		var len = state.objectMode ? 1 : chunk.length;
		state.length += len;
		var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.
	
		if (!ret) state.needDrain = true;
	
		if (state.writing || state.corked) {
			var last = state.lastBufferedRequest;
			state.lastBufferedRequest = {
				chunk: chunk,
				encoding: encoding,
				isBuf: isBuf,
				callback: cb,
				next: null
			};
	
			if (last) {
				last.next = state.lastBufferedRequest;
			} else {
				state.bufferedRequest = state.lastBufferedRequest;
			}
	
			state.bufferedRequestCount += 1;
		} else {
			doWrite(stream, state, false, len, chunk, encoding, cb);
		}
	
		return ret;
	}
	
	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
		state.writelen = len;
		state.writecb = cb;
		state.writing = true;
		state.sync = true;
		if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
		state.sync = false;
	}
	
	function onwriteError(stream, state, sync, er, cb) {
		--state.pendingcb;
	
		if (sync) {
			// defer the callback if we are being called synchronously
			// to avoid piling up things on the stack
			process.nextTick(cb, er); // this can emit finish, and it will always happen
			// after error
	
			process.nextTick(finishMaybe, stream, state);
			stream._writableState.errorEmitted = true;
			errorOrDestroy(stream, er);
		} else {
			// the caller expect this to happen before if
			// it is async
			cb(er);
			stream._writableState.errorEmitted = true;
			errorOrDestroy(stream, er); // this can emit finish, but finish must
			// always follow error
	
			finishMaybe(stream, state);
		}
	}
	
	function onwriteStateUpdate(state) {
		state.writing = false;
		state.writecb = null;
		state.length -= state.writelen;
		state.writelen = 0;
	}
	
	function onwrite(stream, er) {
		var state = stream._writableState;
		var sync = state.sync;
		var cb = state.writecb;
		if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
		onwriteStateUpdate(state);
		if (er) onwriteError(stream, state, sync, er, cb);else {
			// Check if we're actually ready to finish, but don't emit yet
			var finished = needFinish(state) || stream.destroyed;
	
			if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
				clearBuffer(stream, state);
			}
	
			if (sync) {
				process.nextTick(afterWrite, stream, state, finished, cb);
			} else {
				afterWrite(stream, state, finished, cb);
			}
		}
	}
	
	function afterWrite(stream, state, finished, cb) {
		if (!finished) onwriteDrain(stream, state);
		state.pendingcb--;
		cb();
		finishMaybe(stream, state);
	} // Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	
	
	function onwriteDrain(stream, state) {
		if (state.length === 0 && state.needDrain) {
			state.needDrain = false;
			stream.emit('drain');
		}
	} // if there's something in the buffer waiting, then process it
	
	
	function clearBuffer(stream, state) {
		state.bufferProcessing = true;
		var entry = state.bufferedRequest;
	
		if (stream._writev && entry && entry.next) {
			// Fast case, write everything using _writev()
			var l = state.bufferedRequestCount;
			var buffer = new Array(l);
			var holder = state.corkedRequestsFree;
			holder.entry = entry;
			var count = 0;
			var allBuffers = true;
	
			while (entry) {
				buffer[count] = entry;
				if (!entry.isBuf) allBuffers = false;
				entry = entry.next;
				count += 1;
			}
	
			buffer.allBuffers = allBuffers;
			doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
			// as the hot path ends with doWrite
	
			state.pendingcb++;
			state.lastBufferedRequest = null;
	
			if (holder.next) {
				state.corkedRequestsFree = holder.next;
				holder.next = null;
			} else {
				state.corkedRequestsFree = new CorkedRequest(state);
			}
	
			state.bufferedRequestCount = 0;
		} else {
			// Slow case, write chunks one-by-one
			while (entry) {
				var chunk = entry.chunk;
				var encoding = entry.encoding;
				var cb = entry.callback;
				var len = state.objectMode ? 1 : chunk.length;
				doWrite(stream, state, false, len, chunk, encoding, cb);
				entry = entry.next;
				state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
				// it means that we need to wait until it does.
				// also, that means that the chunk and cb are currently
				// being processed, so move the buffer counter past them.
	
				if (state.writing) {
					break;
				}
			}
	
			if (entry === null) state.lastBufferedRequest = null;
		}
	
		state.bufferedRequest = entry;
		state.bufferProcessing = false;
	}
	
	Writable.prototype._write = function (chunk, encoding, cb) {
		cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
	};
	
	Writable.prototype._writev = null;
	
	Writable.prototype.end = function (chunk, encoding, cb) {
		var state = this._writableState;
	
		if (typeof chunk === 'function') {
			cb = chunk;
			chunk = null;
			encoding = null;
		} else if (typeof encoding === 'function') {
			cb = encoding;
			encoding = null;
		}
	
		if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks
	
		if (state.corked) {
			state.corked = 1;
			this.uncork();
		} // ignore unnecessary end() calls.
	
	
		if (!state.ending) endWritable(this, state, cb);
		return this;
	};
	
	Object.defineProperty(Writable.prototype, 'writableLength', {
		// making it explicit this property is not enumerable
		// because otherwise some prototype manipulation in
		// userland will fail
		enumerable: false,
		get: function get() {
			return this._writableState.length;
		}
	});
	
	function needFinish(state) {
		return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}
	
	function callFinal(stream, state) {
		stream._final(function (err) {
			state.pendingcb--;
	
			if (err) {
				errorOrDestroy(stream, err);
			}
	
			state.prefinished = true;
			stream.emit('prefinish');
			finishMaybe(stream, state);
		});
	}
	
	function prefinish(stream, state) {
		if (!state.prefinished && !state.finalCalled) {
			if (typeof stream._final === 'function' && !state.destroyed) {
				state.pendingcb++;
				state.finalCalled = true;
				process.nextTick(callFinal, stream, state);
			} else {
				state.prefinished = true;
				stream.emit('prefinish');
			}
		}
	}
	
	function finishMaybe(stream, state) {
		var need = needFinish(state);
	
		if (need) {
			prefinish(stream, state);
	
			if (state.pendingcb === 0) {
				state.finished = true;
				stream.emit('finish');
	
				if (state.autoDestroy) {
					// In case of duplex streams we need a way to detect
					// if the readable side is ready for autoDestroy as well
					var rState = stream._readableState;
	
					if (!rState || rState.autoDestroy && rState.endEmitted) {
						stream.destroy();
					}
				}
			}
		}
	
		return need;
	}
	
	function endWritable(stream, state, cb) {
		state.ending = true;
		finishMaybe(stream, state);
	
		if (cb) {
			if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
		}
	
		state.ended = true;
		stream.writable = false;
	}
	
	function onCorkedFinish(corkReq, state, err) {
		var entry = corkReq.entry;
		corkReq.entry = null;
	
		while (entry) {
			var cb = entry.callback;
			state.pendingcb--;
			cb(err);
			entry = entry.next;
		} // reuse the free corkReq.
	
	
		state.corkedRequestsFree.next = corkReq;
	}
	
	Object.defineProperty(Writable.prototype, 'destroyed', {
		// making it explicit this property is not enumerable
		// because otherwise some prototype manipulation in
		// userland will fail
		enumerable: false,
		get: function get() {
			if (this._writableState === undefined) {
				return false;
			}
	
			return this._writableState.destroyed;
		},
		set: function set(value) {
			// we ignore the value if the stream
			// has not been initialized yet
			if (!this._writableState) {
				return;
			} // backward compatibility, the user is explicitly
			// managing destroyed
	
	
			this._writableState.destroyed = value;
		}
	});
	Writable.prototype.destroy = destroyImpl.destroy;
	Writable.prototype._undestroy = destroyImpl.undestroy;
	
	Writable.prototype._destroy = function (err, cb) {
		cb(err);
	};
	}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"../errors":37,"./_stream_duplex":38,"./internal/streams/destroy":45,"./internal/streams/state":49,"./internal/streams/stream":50,"_process":34,"buffer":"buffer","inherits":31,"util-deprecate":59}],43:[function(require,module,exports){
	(function (process){(function (){
	'use strict';
	
	var _Object$setPrototypeO;
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var finished = require('./end-of-stream');
	
	var kLastResolve = Symbol('lastResolve');
	var kLastReject = Symbol('lastReject');
	var kError = Symbol('error');
	var kEnded = Symbol('ended');
	var kLastPromise = Symbol('lastPromise');
	var kHandlePromise = Symbol('handlePromise');
	var kStream = Symbol('stream');
	
	function createIterResult(value, done) {
		return {
			value: value,
			done: done
		};
	}
	
	function readAndResolve(iter) {
		var resolve = iter[kLastResolve];
	
		if (resolve !== null) {
			var data = iter[kStream].read(); // we defer if data is null
			// we can be expecting either 'end' or
			// 'error'
	
			if (data !== null) {
				iter[kLastPromise] = null;
				iter[kLastResolve] = null;
				iter[kLastReject] = null;
				resolve(createIterResult(data, false));
			}
		}
	}
	
	function onReadable(iter) {
		// we wait for the next tick, because it might
		// emit an error with process.nextTick
		process.nextTick(readAndResolve, iter);
	}
	
	function wrapForNext(lastPromise, iter) {
		return function (resolve, reject) {
			lastPromise.then(function () {
				if (iter[kEnded]) {
					resolve(createIterResult(undefined, true));
					return;
				}
	
				iter[kHandlePromise](resolve, reject);
			}, reject);
		};
	}
	
	var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
	var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
		get stream() {
			return this[kStream];
		},
	
		next: function next() {
			var _this = this;
	
			// if we have detected an error in the meanwhile
			// reject straight away
			var error = this[kError];
	
			if (error !== null) {
				return Promise.reject(error);
			}
	
			if (this[kEnded]) {
				return Promise.resolve(createIterResult(undefined, true));
			}
	
			if (this[kStream].destroyed) {
				// We need to defer via nextTick because if .destroy(err) is
				// called, the error will be emitted via nextTick, and
				// we cannot guarantee that there is no error lingering around
				// waiting to be emitted.
				return new Promise(function (resolve, reject) {
					process.nextTick(function () {
						if (_this[kError]) {
							reject(_this[kError]);
						} else {
							resolve(createIterResult(undefined, true));
						}
					});
				});
			} // if we have multiple next() calls
			// we will wait for the previous Promise to finish
			// this logic is optimized to support for await loops,
			// where next() is only called once at a time
	
	
			var lastPromise = this[kLastPromise];
			var promise;
	
			if (lastPromise) {
				promise = new Promise(wrapForNext(lastPromise, this));
			} else {
				// fast path needed to support multiple this.push()
				// without triggering the next() queue
				var data = this[kStream].read();
	
				if (data !== null) {
					return Promise.resolve(createIterResult(data, false));
				}
	
				promise = new Promise(this[kHandlePromise]);
			}
	
			this[kLastPromise] = promise;
			return promise;
		}
	}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
		return this;
	}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
		var _this2 = this;
	
		// destroy(err, cb) is a private API
		// we can guarantee we have that here, because we control the
		// Readable class this is attached to
		return new Promise(function (resolve, reject) {
			_this2[kStream].destroy(null, function (err) {
				if (err) {
					reject(err);
					return;
				}
	
				resolve(createIterResult(undefined, true));
			});
		});
	}), _Object$setPrototypeO), AsyncIteratorPrototype);
	
	var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
		var _Object$create;
	
		var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
			value: stream,
			writable: true
		}), _defineProperty(_Object$create, kLastResolve, {
			value: null,
			writable: true
		}), _defineProperty(_Object$create, kLastReject, {
			value: null,
			writable: true
		}), _defineProperty(_Object$create, kError, {
			value: null,
			writable: true
		}), _defineProperty(_Object$create, kEnded, {
			value: stream._readableState.endEmitted,
			writable: true
		}), _defineProperty(_Object$create, kHandlePromise, {
			value: function value(resolve, reject) {
				var data = iterator[kStream].read();
	
				if (data) {
					iterator[kLastPromise] = null;
					iterator[kLastResolve] = null;
					iterator[kLastReject] = null;
					resolve(createIterResult(data, false));
				} else {
					iterator[kLastResolve] = resolve;
					iterator[kLastReject] = reject;
				}
			},
			writable: true
		}), _Object$create));
		iterator[kLastPromise] = null;
		finished(stream, function (err) {
			if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
				var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
				// returned by next() and store the error
	
				if (reject !== null) {
					iterator[kLastPromise] = null;
					iterator[kLastResolve] = null;
					iterator[kLastReject] = null;
					reject(err);
				}
	
				iterator[kError] = err;
				return;
			}
	
			var resolve = iterator[kLastResolve];
	
			if (resolve !== null) {
				iterator[kLastPromise] = null;
				iterator[kLastResolve] = null;
				iterator[kLastReject] = null;
				resolve(createIterResult(undefined, true));
			}
	
			iterator[kEnded] = true;
		});
		stream.on('readable', onReadable.bind(null, iterator));
		return iterator;
	};
	
	module.exports = createReadableStreamAsyncIterator;
	}).call(this)}).call(this,require('_process'))
	},{"./end-of-stream":46,"_process":34}],44:[function(require,module,exports){
	'use strict';
	
	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }
	
	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
	
	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
	
	var _require = require('buffer'),
			Buffer = _require.Buffer;
	
	var _require2 = require('util'),
			inspect = _require2.inspect;
	
	var custom = inspect && inspect.custom || 'inspect';
	
	function copyBuffer(src, target, offset) {
		Buffer.prototype.copy.call(src, target, offset);
	}
	
	module.exports =
	/*#__PURE__*/
	function () {
		function BufferList() {
			_classCallCheck(this, BufferList);
	
			this.head = null;
			this.tail = null;
			this.length = 0;
		}
	
		_createClass(BufferList, [{
			key: "push",
			value: function push(v) {
				var entry = {
					data: v,
					next: null
				};
				if (this.length > 0) this.tail.next = entry;else this.head = entry;
				this.tail = entry;
				++this.length;
			}
		}, {
			key: "unshift",
			value: function unshift(v) {
				var entry = {
					data: v,
					next: this.head
				};
				if (this.length === 0) this.tail = entry;
				this.head = entry;
				++this.length;
			}
		}, {
			key: "shift",
			value: function shift() {
				if (this.length === 0) return;
				var ret = this.head.data;
				if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
				--this.length;
				return ret;
			}
		}, {
			key: "clear",
			value: function clear() {
				this.head = this.tail = null;
				this.length = 0;
			}
		}, {
			key: "join",
			value: function join(s) {
				if (this.length === 0) return '';
				var p = this.head;
				var ret = '' + p.data;
	
				while (p = p.next) {
					ret += s + p.data;
				}
	
				return ret;
			}
		}, {
			key: "concat",
			value: function concat(n) {
				if (this.length === 0) return Buffer.alloc(0);
				var ret = Buffer.allocUnsafe(n >>> 0);
				var p = this.head;
				var i = 0;
	
				while (p) {
					copyBuffer(p.data, ret, i);
					i += p.data.length;
					p = p.next;
				}
	
				return ret;
			} // Consumes a specified amount of bytes or characters from the buffered data.
	
		}, {
			key: "consume",
			value: function consume(n, hasStrings) {
				var ret;
	
				if (n < this.head.data.length) {
					// `slice` is the same for buffers and strings.
					ret = this.head.data.slice(0, n);
					this.head.data = this.head.data.slice(n);
				} else if (n === this.head.data.length) {
					// First chunk is a perfect match.
					ret = this.shift();
				} else {
					// Result spans more than one buffer.
					ret = hasStrings ? this._getString(n) : this._getBuffer(n);
				}
	
				return ret;
			}
		}, {
			key: "first",
			value: function first() {
				return this.head.data;
			} // Consumes a specified amount of characters from the buffered data.
	
		}, {
			key: "_getString",
			value: function _getString(n) {
				var p = this.head;
				var c = 1;
				var ret = p.data;
				n -= ret.length;
	
				while (p = p.next) {
					var str = p.data;
					var nb = n > str.length ? str.length : n;
					if (nb === str.length) ret += str;else ret += str.slice(0, n);
					n -= nb;
	
					if (n === 0) {
						if (nb === str.length) {
							++c;
							if (p.next) this.head = p.next;else this.head = this.tail = null;
						} else {
							this.head = p;
							p.data = str.slice(nb);
						}
	
						break;
					}
	
					++c;
				}
	
				this.length -= c;
				return ret;
			} // Consumes a specified amount of bytes from the buffered data.
	
		}, {
			key: "_getBuffer",
			value: function _getBuffer(n) {
				var ret = Buffer.allocUnsafe(n);
				var p = this.head;
				var c = 1;
				p.data.copy(ret);
				n -= p.data.length;
	
				while (p = p.next) {
					var buf = p.data;
					var nb = n > buf.length ? buf.length : n;
					buf.copy(ret, ret.length - n, 0, nb);
					n -= nb;
	
					if (n === 0) {
						if (nb === buf.length) {
							++c;
							if (p.next) this.head = p.next;else this.head = this.tail = null;
						} else {
							this.head = p;
							p.data = buf.slice(nb);
						}
	
						break;
					}
	
					++c;
				}
	
				this.length -= c;
				return ret;
			} // Make sure the linked list only shows the minimal necessary information.
	
		}, {
			key: custom,
			value: function value(_, options) {
				return inspect(this, _objectSpread({}, options, {
					// Only inspect one level.
					depth: 0,
					// It should not recurse.
					customInspect: false
				}));
			}
		}]);
	
		return BufferList;
	}();
	},{"buffer":"buffer","util":26}],45:[function(require,module,exports){
	(function (process){(function (){
	'use strict'; // undocumented cb() API, needed for core, not for public API
	
	function destroy(err, cb) {
		var _this = this;
	
		var readableDestroyed = this._readableState && this._readableState.destroyed;
		var writableDestroyed = this._writableState && this._writableState.destroyed;
	
		if (readableDestroyed || writableDestroyed) {
			if (cb) {
				cb(err);
			} else if (err) {
				if (!this._writableState) {
					process.nextTick(emitErrorNT, this, err);
				} else if (!this._writableState.errorEmitted) {
					this._writableState.errorEmitted = true;
					process.nextTick(emitErrorNT, this, err);
				}
			}
	
			return this;
		} // we set destroyed to true before firing error callbacks in order
		// to make it re-entrance safe in case destroy() is called within callbacks
	
	
		if (this._readableState) {
			this._readableState.destroyed = true;
		} // if this is a duplex stream mark the writable part as destroyed as well
	
	
		if (this._writableState) {
			this._writableState.destroyed = true;
		}
	
		this._destroy(err || null, function (err) {
			if (!cb && err) {
				if (!_this._writableState) {
					process.nextTick(emitErrorAndCloseNT, _this, err);
				} else if (!_this._writableState.errorEmitted) {
					_this._writableState.errorEmitted = true;
					process.nextTick(emitErrorAndCloseNT, _this, err);
				} else {
					process.nextTick(emitCloseNT, _this);
				}
			} else if (cb) {
				process.nextTick(emitCloseNT, _this);
				cb(err);
			} else {
				process.nextTick(emitCloseNT, _this);
			}
		});
	
		return this;
	}
	
	function emitErrorAndCloseNT(self, err) {
		emitErrorNT(self, err);
		emitCloseNT(self);
	}
	
	function emitCloseNT(self) {
		if (self._writableState && !self._writableState.emitClose) return;
		if (self._readableState && !self._readableState.emitClose) return;
		self.emit('close');
	}
	
	function undestroy() {
		if (this._readableState) {
			this._readableState.destroyed = false;
			this._readableState.reading = false;
			this._readableState.ended = false;
			this._readableState.endEmitted = false;
		}
	
		if (this._writableState) {
			this._writableState.destroyed = false;
			this._writableState.ended = false;
			this._writableState.ending = false;
			this._writableState.finalCalled = false;
			this._writableState.prefinished = false;
			this._writableState.finished = false;
			this._writableState.errorEmitted = false;
		}
	}
	
	function emitErrorNT(self, err) {
		self.emit('error', err);
	}
	
	function errorOrDestroy(stream, err) {
		// We have tests that rely on errors being emitted
		// in the same tick, so changing this is semver major.
		// For now when you opt-in to autoDestroy we allow
		// the error to be emitted nextTick. In a future
		// semver major update we should change the default to this.
		var rState = stream._readableState;
		var wState = stream._writableState;
		if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
	}
	
	module.exports = {
		destroy: destroy,
		undestroy: undestroy,
		errorOrDestroy: errorOrDestroy
	};
	}).call(this)}).call(this,require('_process'))
	},{"_process":34}],46:[function(require,module,exports){
	// Ported from https://github.com/mafintosh/end-of-stream with
	// permission from the author, Mathias Buus (@mafintosh).
	'use strict';
	
	var ERR_STREAM_PREMATURE_CLOSE = require('../../../errors').codes.ERR_STREAM_PREMATURE_CLOSE;
	
	function once(callback) {
		var called = false;
		return function () {
			if (called) return;
			called = true;
	
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			callback.apply(this, args);
		};
	}
	
	function noop() {}
	
	function isRequest(stream) {
		return stream.setHeader && typeof stream.abort === 'function';
	}
	
	function eos(stream, opts, callback) {
		if (typeof opts === 'function') return eos(stream, null, opts);
		if (!opts) opts = {};
		callback = once(callback || noop);
		var readable = opts.readable || opts.readable !== false && stream.readable;
		var writable = opts.writable || opts.writable !== false && stream.writable;
	
		var onlegacyfinish = function onlegacyfinish() {
			if (!stream.writable) onfinish();
		};
	
		var writableEnded = stream._writableState && stream._writableState.finished;
	
		var onfinish = function onfinish() {
			writable = false;
			writableEnded = true;
			if (!readable) callback.call(stream);
		};
	
		var readableEnded = stream._readableState && stream._readableState.endEmitted;
	
		var onend = function onend() {
			readable = false;
			readableEnded = true;
			if (!writable) callback.call(stream);
		};
	
		var onerror = function onerror(err) {
			callback.call(stream, err);
		};
	
		var onclose = function onclose() {
			var err;
	
			if (readable && !readableEnded) {
				if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
				return callback.call(stream, err);
			}
	
			if (writable && !writableEnded) {
				if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
				return callback.call(stream, err);
			}
		};
	
		var onrequest = function onrequest() {
			stream.req.on('finish', onfinish);
		};
	
		if (isRequest(stream)) {
			stream.on('complete', onfinish);
			stream.on('abort', onclose);
			if (stream.req) onrequest();else stream.on('request', onrequest);
		} else if (writable && !stream._writableState) {
			// legacy streams
			stream.on('end', onlegacyfinish);
			stream.on('close', onlegacyfinish);
		}
	
		stream.on('end', onend);
		stream.on('finish', onfinish);
		if (opts.error !== false) stream.on('error', onerror);
		stream.on('close', onclose);
		return function () {
			stream.removeListener('complete', onfinish);
			stream.removeListener('abort', onclose);
			stream.removeListener('request', onrequest);
			if (stream.req) stream.req.removeListener('finish', onfinish);
			stream.removeListener('end', onlegacyfinish);
			stream.removeListener('close', onlegacyfinish);
			stream.removeListener('finish', onfinish);
			stream.removeListener('end', onend);
			stream.removeListener('error', onerror);
			stream.removeListener('close', onclose);
		};
	}
	
	module.exports = eos;
	},{"../../../errors":37}],47:[function(require,module,exports){
	module.exports = function () {
		throw new Error('Readable.from is not available in the browser')
	};
	
	},{}],48:[function(require,module,exports){
	// Ported from https://github.com/mafintosh/pump with
	// permission from the author, Mathias Buus (@mafintosh).
	'use strict';
	
	var eos;
	
	function once(callback) {
		var called = false;
		return function () {
			if (called) return;
			called = true;
			callback.apply(void 0, arguments);
		};
	}
	
	var _require$codes = require('../../../errors').codes,
			ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
			ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
	
	function noop(err) {
		// Rethrow the error if it exists to avoid swallowing it
		if (err) throw err;
	}
	
	function isRequest(stream) {
		return stream.setHeader && typeof stream.abort === 'function';
	}
	
	function destroyer(stream, reading, writing, callback) {
		callback = once(callback);
		var closed = false;
		stream.on('close', function () {
			closed = true;
		});
		if (eos === undefined) eos = require('./end-of-stream');
		eos(stream, {
			readable: reading,
			writable: writing
		}, function (err) {
			if (err) return callback(err);
			closed = true;
			callback();
		});
		var destroyed = false;
		return function (err) {
			if (closed) return;
			if (destroyed) return;
			destroyed = true; // request.destroy just do .end - .abort is what we want
	
			if (isRequest(stream)) return stream.abort();
			if (typeof stream.destroy === 'function') return stream.destroy();
			callback(err || new ERR_STREAM_DESTROYED('pipe'));
		};
	}
	
	function call(fn) {
		fn();
	}
	
	function pipe(from, to) {
		return from.pipe(to);
	}
	
	function popCallback(streams) {
		if (!streams.length) return noop;
		if (typeof streams[streams.length - 1] !== 'function') return noop;
		return streams.pop();
	}
	
	function pipeline() {
		for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
			streams[_key] = arguments[_key];
		}
	
		var callback = popCallback(streams);
		if (Array.isArray(streams[0])) streams = streams[0];
	
		if (streams.length < 2) {
			throw new ERR_MISSING_ARGS('streams');
		}
	
		var error;
		var destroys = streams.map(function (stream, i) {
			var reading = i < streams.length - 1;
			var writing = i > 0;
			return destroyer(stream, reading, writing, function (err) {
				if (!error) error = err;
				if (err) destroys.forEach(call);
				if (reading) return;
				destroys.forEach(call);
				callback(error);
			});
		});
		return streams.reduce(pipe);
	}
	
	module.exports = pipeline;
	},{"../../../errors":37,"./end-of-stream":46}],49:[function(require,module,exports){
	'use strict';
	
	var ERR_INVALID_OPT_VALUE = require('../../../errors').codes.ERR_INVALID_OPT_VALUE;
	
	function highWaterMarkFrom(options, isDuplex, duplexKey) {
		return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
	}
	
	function getHighWaterMark(state, options, duplexKey, isDuplex) {
		var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
	
		if (hwm != null) {
			if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
				var name = isDuplex ? duplexKey : 'highWaterMark';
				throw new ERR_INVALID_OPT_VALUE(name, hwm);
			}
	
			return Math.floor(hwm);
		} // Default value
	
	
		return state.objectMode ? 16 : 16 * 1024;
	}
	
	module.exports = {
		getHighWaterMark: getHighWaterMark
	};
	},{"../../../errors":37}],50:[function(require,module,exports){
	module.exports = require('events').EventEmitter;
	
	},{"events":"events"}],51:[function(require,module,exports){
	exports = module.exports = require('./lib/_stream_readable.js');
	exports.Stream = exports;
	exports.Readable = exports;
	exports.Writable = require('./lib/_stream_writable.js');
	exports.Duplex = require('./lib/_stream_duplex.js');
	exports.Transform = require('./lib/_stream_transform.js');
	exports.PassThrough = require('./lib/_stream_passthrough.js');
	exports.finished = require('./lib/internal/streams/end-of-stream.js');
	exports.pipeline = require('./lib/internal/streams/pipeline.js');
	
	},{"./lib/_stream_duplex.js":38,"./lib/_stream_passthrough.js":39,"./lib/_stream_readable.js":40,"./lib/_stream_transform.js":41,"./lib/_stream_writable.js":42,"./lib/internal/streams/end-of-stream.js":46,"./lib/internal/streams/pipeline.js":48}],52:[function(require,module,exports){
	/*! run-parallel. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
	module.exports = runParallel
	
	const queueMicrotask = require('queue-microtask')
	
	function runParallel (tasks, cb) {
		let results, pending, keys
		let isSync = true
	
		if (Array.isArray(tasks)) {
			results = []
			pending = tasks.length
		} else {
			keys = Object.keys(tasks)
			results = {}
			pending = keys.length
		}
	
		function done (err) {
			function end () {
				if (cb) cb(err, results)
				cb = null
			}
			if (isSync) queueMicrotask(end)
			else end()
		}
	
		function each (i, err, result) {
			results[i] = result
			if (--pending === 0 || err) {
				done(err)
			}
		}
	
		if (!pending) {
			// empty
			done(null)
		} else if (keys) {
			// object
			keys.forEach(function (key) {
				tasks[key](function (err, result) { each(key, err, result) })
			})
		} else {
			// array
			tasks.forEach(function (task, i) {
				task(function (err, result) { each(i, err, result) })
			})
		}
	
		isSync = false
	}
	
	},{"queue-microtask":35}],53:[function(require,module,exports){
	/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
	/* eslint-disable node/no-deprecated-api */
	var buffer = require('buffer')
	var Buffer = buffer.Buffer
	
	// alternative to using Object.keys for old browsers
	function copyProps (src, dst) {
		for (var key in src) {
			dst[key] = src[key]
		}
	}
	if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
		module.exports = buffer
	} else {
		// Copy properties from require('buffer')
		copyProps(buffer, exports)
		exports.Buffer = SafeBuffer
	}
	
	function SafeBuffer (arg, encodingOrOffset, length) {
		return Buffer(arg, encodingOrOffset, length)
	}
	
	SafeBuffer.prototype = Object.create(Buffer.prototype)
	
	// Copy static methods from Buffer
	copyProps(Buffer, SafeBuffer)
	
	SafeBuffer.from = function (arg, encodingOrOffset, length) {
		if (typeof arg === 'number') {
			throw new TypeError('Argument must not be a number')
		}
		return Buffer(arg, encodingOrOffset, length)
	}
	
	SafeBuffer.alloc = function (size, fill, encoding) {
		if (typeof size !== 'number') {
			throw new TypeError('Argument must be a number')
		}
		var buf = Buffer(size)
		if (fill !== undefined) {
			if (typeof encoding === 'string') {
				buf.fill(fill, encoding)
			} else {
				buf.fill(fill)
			}
		} else {
			buf.fill(0)
		}
		return buf
	}
	
	SafeBuffer.allocUnsafe = function (size) {
		if (typeof size !== 'number') {
			throw new TypeError('Argument must be a number')
		}
		return Buffer(size)
	}
	
	SafeBuffer.allocUnsafeSlow = function (size) {
		if (typeof size !== 'number') {
			throw new TypeError('Argument must be a number')
		}
		return buffer.SlowBuffer(size)
	}
	
	},{"buffer":"buffer"}],54:[function(require,module,exports){
	var Buffer = require('safe-buffer').Buffer
	
	// prototype class for hash functions
	function Hash (blockSize, finalSize) {
		this._block = Buffer.alloc(blockSize)
		this._finalSize = finalSize
		this._blockSize = blockSize
		this._len = 0
	}
	
	Hash.prototype.update = function (data, enc) {
		if (typeof data === 'string') {
			enc = enc || 'utf8'
			data = Buffer.from(data, enc)
		}
	
		var block = this._block
		var blockSize = this._blockSize
		var length = data.length
		var accum = this._len
	
		for (var offset = 0; offset < length;) {
			var assigned = accum % blockSize
			var remainder = Math.min(length - offset, blockSize - assigned)
	
			for (var i = 0; i < remainder; i++) {
				block[assigned + i] = data[offset + i]
			}
	
			accum += remainder
			offset += remainder
	
			if ((accum % blockSize) === 0) {
				this._update(block)
			}
		}
	
		this._len += length
		return this
	}
	
	Hash.prototype.digest = function (enc) {
		var rem = this._len % this._blockSize
	
		this._block[rem] = 0x80
	
		// zero (rem + 1) trailing bits, where (rem + 1) is the smallest
		// non-negative solution to the equation (length + 1 + (rem + 1)) === finalSize mod blockSize
		this._block.fill(0, rem + 1)
	
		if (rem >= this._finalSize) {
			this._update(this._block)
			this._block.fill(0)
		}
	
		var bits = this._len * 8
	
		// uint32
		if (bits <= 0xffffffff) {
			this._block.writeUInt32BE(bits, this._blockSize - 4)
	
		// uint64
		} else {
			var lowBits = (bits & 0xffffffff) >>> 0
			var highBits = (bits - lowBits) / 0x100000000
	
			this._block.writeUInt32BE(highBits, this._blockSize - 8)
			this._block.writeUInt32BE(lowBits, this._blockSize - 4)
		}
	
		this._update(this._block)
		var hash = this._hash()
	
		return enc ? hash.toString(enc) : hash
	}
	
	Hash.prototype._update = function () {
		throw new Error('_update must be implemented by subclass')
	}
	
	module.exports = Hash
	
	},{"safe-buffer":53}],55:[function(require,module,exports){
	/*
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
	 * in FIPS PUB 180-1
	 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for details.
	 */
	
	var inherits = require('inherits')
	var Hash = require('./hash')
	var Buffer = require('safe-buffer').Buffer
	
	var K = [
		0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0
	]
	
	var W = new Array(80)
	
	function Sha1 () {
		this.init()
		this._w = W
	
		Hash.call(this, 64, 56)
	}
	
	inherits(Sha1, Hash)
	
	Sha1.prototype.init = function () {
		this._a = 0x67452301
		this._b = 0xefcdab89
		this._c = 0x98badcfe
		this._d = 0x10325476
		this._e = 0xc3d2e1f0
	
		return this
	}
	
	function rotl1 (num) {
		return (num << 1) | (num >>> 31)
	}
	
	function rotl5 (num) {
		return (num << 5) | (num >>> 27)
	}
	
	function rotl30 (num) {
		return (num << 30) | (num >>> 2)
	}
	
	function ft (s, b, c, d) {
		if (s === 0) return (b & c) | ((~b) & d)
		if (s === 2) return (b & c) | (b & d) | (c & d)
		return b ^ c ^ d
	}
	
	Sha1.prototype._update = function (M) {
		var W = this._w
	
		var a = this._a | 0
		var b = this._b | 0
		var c = this._c | 0
		var d = this._d | 0
		var e = this._e | 0
	
		for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
		for (; i < 80; ++i) W[i] = rotl1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16])
	
		for (var j = 0; j < 80; ++j) {
			var s = ~~(j / 20)
			var t = (rotl5(a) + ft(s, b, c, d) + e + W[j] + K[s]) | 0
	
			e = d
			d = c
			c = rotl30(b)
			b = a
			a = t
		}
	
		this._a = (a + this._a) | 0
		this._b = (b + this._b) | 0
		this._c = (c + this._c) | 0
		this._d = (d + this._d) | 0
		this._e = (e + this._e) | 0
	}
	
	Sha1.prototype._hash = function () {
		var H = Buffer.allocUnsafe(20)
	
		H.writeInt32BE(this._a | 0, 0)
		H.writeInt32BE(this._b | 0, 4)
		H.writeInt32BE(this._c | 0, 8)
		H.writeInt32BE(this._d | 0, 12)
		H.writeInt32BE(this._e | 0, 16)
	
		return H
	}
	
	module.exports = Sha1
	
	},{"./hash":54,"inherits":31,"safe-buffer":53}],56:[function(require,module,exports){
	/*! simple-peer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
	const debug = require('debug')('simple-peer')
	const getBrowserRTC = require('get-browser-rtc')
	const randombytes = require('randombytes')
	const stream = require('readable-stream')
	const queueMicrotask = require('queue-microtask') // TODO: remove when Node 10 is not supported
	const errCode = require('err-code')
	const { Buffer } = require('buffer')
	
	const MAX_BUFFERED_AMOUNT = 64 * 1024
	const ICECOMPLETE_TIMEOUT = 5 * 1000
	const CHANNEL_CLOSING_TIMEOUT = 5 * 1000
	
	// HACK: Filter trickle lines when trickle is disabled #354
	function filterTrickle (sdp) {
		return sdp.replace(/a=ice-options:trickle\s\n/g, '')
	}
	
	function warn (message) {
		console.warn(message)
	}
	
	/**
	 * WebRTC peer connection. Same API as node core `net.Socket`, plus a few extra methods.
	 * Duplex stream.
	 * @param {Object} opts
	 */
	class Peer extends stream.Duplex {
		constructor (opts) {
			opts = Object.assign({
				allowHalfOpen: false
			}, opts)
	
			super(opts)
	
			this._id = randombytes(4).toString('hex').slice(0, 7)
			this._debug('new peer %o', opts)
	
			this.channelName = opts.initiator
				? opts.channelName || randombytes(20).toString('hex')
				: null
	
			this.initiator = opts.initiator || false
			this.channelConfig = opts.channelConfig || Peer.channelConfig
			this.channelNegotiated = this.channelConfig.negotiated
			this.config = Object.assign({}, Peer.config, opts.config)
			this.offerOptions = opts.offerOptions || {}
			this.answerOptions = opts.answerOptions || {}
			this.sdpTransform = opts.sdpTransform || (sdp => sdp)
			this.streams = opts.streams || (opts.stream ? [opts.stream] : []) // support old "stream" option
			this.trickle = opts.trickle !== undefined ? opts.trickle : true
			this.allowHalfTrickle = opts.allowHalfTrickle !== undefined ? opts.allowHalfTrickle : false
			this.iceCompleteTimeout = opts.iceCompleteTimeout || ICECOMPLETE_TIMEOUT
	
			this.destroyed = false
			this.destroying = false
			this._connected = false
	
			this.remoteAddress = undefined
			this.remoteFamily = undefined
			this.remotePort = undefined
			this.localAddress = undefined
			this.localFamily = undefined
			this.localPort = undefined
	
			this._wrtc = (opts.wrtc && typeof opts.wrtc === 'object')
				? opts.wrtc
				: getBrowserRTC()
	
			if (!this._wrtc) {
				if (typeof window === 'undefined') {
					throw errCode(new Error('No WebRTC support: Specify `opts.wrtc` option in this environment'), 'ERR_WEBRTC_SUPPORT')
				} else {
					throw errCode(new Error('No WebRTC support: Not a supported browser'), 'ERR_WEBRTC_SUPPORT')
				}
			}
	
			this._pcReady = false
			this._channelReady = false
			this._iceComplete = false // ice candidate trickle done (got null candidate)
			this._iceCompleteTimer = null // send an offer/answer anyway after some timeout
			this._channel = null
			this._pendingCandidates = []
	
			this._isNegotiating = false // is this peer waiting for negotiation to complete?
			this._firstNegotiation = true
			this._batchedNegotiation = false // batch synchronous negotiations
			this._queuedNegotiation = false // is there a queued negotiation request?
			this._sendersAwaitingStable = []
			this._senderMap = new Map()
			this._closingInterval = null
	
			this._remoteTracks = []
			this._remoteStreams = []
	
			this._chunk = null
			this._cb = null
			this._interval = null
	
			try {
				this._pc = new (this._wrtc.RTCPeerConnection)(this.config)
			} catch (err) {
				this.destroy(errCode(err, 'ERR_PC_CONSTRUCTOR'))
				return
			}
	
			// We prefer feature detection whenever possible, but sometimes that's not
			// possible for certain implementations.
			this._isReactNativeWebrtc = typeof this._pc._peerConnectionId === 'number'
	
			this._pc.oniceconnectionstatechange = () => {
				this._onIceStateChange()
			}
			this._pc.onicegatheringstatechange = () => {
				this._onIceStateChange()
			}
			this._pc.onconnectionstatechange = () => {
				this._onConnectionStateChange()
			}
			this._pc.onsignalingstatechange = () => {
				this._onSignalingStateChange()
			}
			this._pc.onicecandidate = event => {
				this._onIceCandidate(event)
			}
	
			// HACK: Fix for odd Firefox behavior, see: https://github.com/feross/simple-peer/pull/783
			if (typeof this._pc.peerIdentity === 'object') {
				this._pc.peerIdentity.catch(err => {
					this.destroy(errCode(err, 'ERR_PC_PEER_IDENTITY'))
				})
			}
	
			// Other spec events, unused by this implementation:
			// - onconnectionstatechange
			// - onicecandidateerror
			// - onfingerprintfailure
			// - onnegotiationneeded
	
			if (this.initiator || this.channelNegotiated) {
				this._setupData({
					channel: this._pc.createDataChannel(this.channelName, this.channelConfig)
				})
			} else {
				this._pc.ondatachannel = event => {
					this._setupData(event)
				}
			}
	
			if (this.streams) {
				this.streams.forEach(stream => {
					this.addStream(stream)
				})
			}
			this._pc.ontrack = event => {
				this._onTrack(event)
			}
	
			this._debug('initial negotiation')
			this._needsNegotiation()
	
			this._onFinishBound = () => {
				this._onFinish()
			}
			this.once('finish', this._onFinishBound)
		}
	
		get bufferSize () {
			return (this._channel && this._channel.bufferedAmount) || 0
		}
	
		// HACK: it's possible channel.readyState is "closing" before peer.destroy() fires
		// https://bugs.chromium.org/p/chromium/issues/detail?id=882743
		get connected () {
			return (this._connected && this._channel.readyState === 'open')
		}
	
		address () {
			return { port: this.localPort, family: this.localFamily, address: this.localAddress }
		}
	
		signal (data) {
			if (this.destroying) return
			if (this.destroyed) throw errCode(new Error('cannot signal after peer is destroyed'), 'ERR_DESTROYED')
			if (typeof data === 'string') {
				try {
					data = JSON.parse(data)
				} catch (err) {
					data = {}
				}
			}
			this._debug('signal()')
	
			if (data.renegotiate && this.initiator) {
				this._debug('got request to renegotiate')
				this._needsNegotiation()
			}
			if (data.transceiverRequest && this.initiator) {
				this._debug('got request for transceiver')
				this.addTransceiver(data.transceiverRequest.kind, data.transceiverRequest.init)
			}
			if (data.candidate) {
				if (this._pc.remoteDescription && this._pc.remoteDescription.type) {
					this._addIceCandidate(data.candidate)
				} else {
					this._pendingCandidates.push(data.candidate)
				}
			}
			if (data.sdp) {
				this._pc.setRemoteDescription(new (this._wrtc.RTCSessionDescription)(data))
					.then(() => {
						if (this.destroyed) return
	
						this._pendingCandidates.forEach(candidate => {
							this._addIceCandidate(candidate)
						})
						this._pendingCandidates = []
	
						if (this._pc.remoteDescription.type === 'offer') this._createAnswer()
					})
					.catch(err => {
						this.destroy(errCode(err, 'ERR_SET_REMOTE_DESCRIPTION'))
					})
			}
			if (!data.sdp && !data.candidate && !data.renegotiate && !data.transceiverRequest) {
				this.destroy(errCode(new Error('signal() called with invalid signal data'), 'ERR_SIGNALING'))
			}
		}
	
		_addIceCandidate (candidate) {
			const iceCandidateObj = new this._wrtc.RTCIceCandidate(candidate)
			this._pc.addIceCandidate(iceCandidateObj)
				.catch(err => {
					if (!iceCandidateObj.address || iceCandidateObj.address.endsWith('.local')) {
						warn('Ignoring unsupported ICE candidate.')
					} else {
						this.destroy(errCode(err, 'ERR_ADD_ICE_CANDIDATE'))
					}
				})
		}
	
		/**
		 * Send text/binary data to the remote peer.
		 * @param {ArrayBufferView|ArrayBuffer|Buffer|string|Blob} chunk
		 */
		send (chunk) {
			if (this.destroying) return
			if (this.destroyed) throw errCode(new Error('cannot send after peer is destroyed'), 'ERR_DESTROYED')
			this._channel.send(chunk)
		}
	
		/**
		 * Add a Transceiver to the connection.
		 * @param {String} kind
		 * @param {Object} init
		 */
		addTransceiver (kind, init) {
			if (this.destroying) return
			if (this.destroyed) throw errCode(new Error('cannot addTransceiver after peer is destroyed'), 'ERR_DESTROYED')
			this._debug('addTransceiver()')
	
			if (this.initiator) {
				try {
					this._pc.addTransceiver(kind, init)
					this._needsNegotiation()
				} catch (err) {
					this.destroy(errCode(err, 'ERR_ADD_TRANSCEIVER'))
				}
			} else {
				this.emit('signal', { // request initiator to renegotiate
					type: 'transceiverRequest',
					transceiverRequest: { kind, init }
				})
			}
		}
	
		/**
		 * Add a MediaStream to the connection.
		 * @param {MediaStream} stream
		 */
		addStream (stream) {
			if (this.destroying) return
			if (this.destroyed) throw errCode(new Error('cannot addStream after peer is destroyed'), 'ERR_DESTROYED')
			this._debug('addStream()')
	
			stream.getTracks().forEach(track => {
				this.addTrack(track, stream)
			})
		}
	
		/**
		 * Add a MediaStreamTrack to the connection.
		 * @param {MediaStreamTrack} track
		 * @param {MediaStream} stream
		 */
		addTrack (track, stream) {
			if (this.destroying) return
			if (this.destroyed) throw errCode(new Error('cannot addTrack after peer is destroyed'), 'ERR_DESTROYED')
			this._debug('addTrack()')
	
			const submap = this._senderMap.get(track) || new Map() // nested Maps map [track, stream] to sender
			let sender = submap.get(stream)
			if (!sender) {
				sender = this._pc.addTrack(track, stream)
				submap.set(stream, sender)
				this._senderMap.set(track, submap)
				this._needsNegotiation()
			} else if (sender.removed) {
				throw errCode(new Error('Track has been removed. You should enable/disable tracks that you want to re-add.'), 'ERR_SENDER_REMOVED')
			} else {
				throw errCode(new Error('Track has already been added to that stream.'), 'ERR_SENDER_ALREADY_ADDED')
			}
		}
	
		/**
		 * Replace a MediaStreamTrack by another in the connection.
		 * @param {MediaStreamTrack} oldTrack
		 * @param {MediaStreamTrack} newTrack
		 * @param {MediaStream} stream
		 */
		replaceTrack (oldTrack, newTrack, stream) {
			if (this.destroying) return
			if (this.destroyed) throw errCode(new Error('cannot replaceTrack after peer is destroyed'), 'ERR_DESTROYED')
			this._debug('replaceTrack()')
	
			const submap = this._senderMap.get(oldTrack)
			const sender = submap ? submap.get(stream) : null
			if (!sender) {
				throw errCode(new Error('Cannot replace track that was never added.'), 'ERR_TRACK_NOT_ADDED')
			}
			if (newTrack) this._senderMap.set(newTrack, submap)
	
			if (sender.replaceTrack != null) {
				sender.replaceTrack(newTrack)
			} else {
				this.destroy(errCode(new Error('replaceTrack is not supported in this browser'), 'ERR_UNSUPPORTED_REPLACETRACK'))
			}
		}
	
		/**
		 * Remove a MediaStreamTrack from the connection.
		 * @param {MediaStreamTrack} track
		 * @param {MediaStream} stream
		 */
		removeTrack (track, stream) {
			if (this.destroying) return
			if (this.destroyed) throw errCode(new Error('cannot removeTrack after peer is destroyed'), 'ERR_DESTROYED')
			this._debug('removeSender()')
	
			const submap = this._senderMap.get(track)
			const sender = submap ? submap.get(stream) : null
			if (!sender) {
				throw errCode(new Error('Cannot remove track that was never added.'), 'ERR_TRACK_NOT_ADDED')
			}
			try {
				sender.removed = true
				this._pc.removeTrack(sender)
			} catch (err) {
				if (err.name === 'NS_ERROR_UNEXPECTED') {
					this._sendersAwaitingStable.push(sender) // HACK: Firefox must wait until (signalingState === stable) https://bugzilla.mozilla.org/show_bug.cgi?id=1133874
				} else {
					this.destroy(errCode(err, 'ERR_REMOVE_TRACK'))
				}
			}
			this._needsNegotiation()
		}
	
		/**
		 * Remove a MediaStream from the connection.
		 * @param {MediaStream} stream
		 */
		removeStream (stream) {
			if (this.destroying) return
			if (this.destroyed) throw errCode(new Error('cannot removeStream after peer is destroyed'), 'ERR_DESTROYED')
			this._debug('removeSenders()')
	
			stream.getTracks().forEach(track => {
				this.removeTrack(track, stream)
			})
		}
	
		_needsNegotiation () {
			this._debug('_needsNegotiation')
			if (this._batchedNegotiation) return // batch synchronous renegotiations
			this._batchedNegotiation = true
			queueMicrotask(() => {
				this._batchedNegotiation = false
				if (this.initiator || !this._firstNegotiation) {
					this._debug('starting batched negotiation')
					this.negotiate()
				} else {
					this._debug('non-initiator initial negotiation request discarded')
				}
				this._firstNegotiation = false
			})
		}
	
		negotiate () {
			if (this.destroying) return
			if (this.destroyed) throw errCode(new Error('cannot negotiate after peer is destroyed'), 'ERR_DESTROYED')
	
			if (this.initiator) {
				if (this._isNegotiating) {
					this._queuedNegotiation = true
					this._debug('already negotiating, queueing')
				} else {
					this._debug('start negotiation')
					setTimeout(() => { // HACK: Chrome crashes if we immediately call createOffer
						this._createOffer()
					}, 0)
				}
			} else {
				if (this._isNegotiating) {
					this._queuedNegotiation = true
					this._debug('already negotiating, queueing')
				} else {
					this._debug('requesting negotiation from initiator')
					this.emit('signal', { // request initiator to renegotiate
						type: 'renegotiate',
						renegotiate: true
					})
				}
			}
			this._isNegotiating = true
		}
	
		// TODO: Delete this method once readable-stream is updated to contain a default
		// implementation of destroy() that automatically calls _destroy()
		// See: https://github.com/nodejs/readable-stream/issues/283
		destroy (err) {
			this._destroy(err, () => {})
		}
	
		_destroy (err, cb) {
			if (this.destroyed || this.destroying) return
			this.destroying = true
	
			this._debug('destroying (error: %s)', err && (err.message || err))
	
			queueMicrotask(() => { // allow events concurrent with the call to _destroy() to fire (see #692)
				this.destroyed = true
				this.destroying = false
	
				this._debug('destroy (error: %s)', err && (err.message || err))
	
				this.readable = this.writable = false
	
				if (!this._readableState.ended) this.push(null)
				if (!this._writableState.finished) this.end()
	
				this._connected = false
				this._pcReady = false
				this._channelReady = false
				this._remoteTracks = null
				this._remoteStreams = null
				this._senderMap = null
	
				clearInterval(this._closingInterval)
				this._closingInterval = null
	
				clearInterval(this._interval)
				this._interval = null
				this._chunk = null
				this._cb = null
	
				if (this._onFinishBound) this.removeListener('finish', this._onFinishBound)
				this._onFinishBound = null
	
				if (this._channel) {
					try {
						this._channel.close()
					} catch (err) {}
	
					// allow events concurrent with destruction to be handled
					this._channel.onmessage = null
					this._channel.onopen = null
					this._channel.onclose = null
					this._channel.onerror = null
				}
				if (this._pc) {
					try {
						this._pc.close()
					} catch (err) {}
	
					// allow events concurrent with destruction to be handled
					this._pc.oniceconnectionstatechange = null
					this._pc.onicegatheringstatechange = null
					this._pc.onsignalingstatechange = null
					this._pc.onicecandidate = null
					this._pc.ontrack = null
					this._pc.ondatachannel = null
				}
				this._pc = null
				this._channel = null
	
				if (err) this.emit('error', err)
				this.emit('close')
				cb()
			})
		}
	
		_setupData (event) {
			if (!event.channel) {
				// In some situations `pc.createDataChannel()` returns `undefined` (in wrtc),
				// which is invalid behavior. Handle it gracefully.
				// See: https://github.com/feross/simple-peer/issues/163
				return this.destroy(errCode(new Error('Data channel event is missing `channel` property'), 'ERR_DATA_CHANNEL'))
			}
	
			this._channel = event.channel
			this._channel.binaryType = 'arraybuffer'
	
			if (typeof this._channel.bufferedAmountLowThreshold === 'number') {
				this._channel.bufferedAmountLowThreshold = MAX_BUFFERED_AMOUNT
			}
	
			this.channelName = this._channel.label
	
			this._channel.onmessage = event => {
				this._onChannelMessage(event)
			}
			this._channel.onbufferedamountlow = () => {
				this._onChannelBufferedAmountLow()
			}
			this._channel.onopen = () => {
				this._onChannelOpen()
			}
			this._channel.onclose = () => {
				this._onChannelClose()
			}
			this._channel.onerror = event => {
				const err = event.error instanceof Error
					? event.error
					: new Error(`Datachannel error: ${event.message} ${event.filename}:${event.lineno}:${event.colno}`)
				this.destroy(errCode(err, 'ERR_DATA_CHANNEL'))
			}
	
			// HACK: Chrome will sometimes get stuck in readyState "closing", let's check for this condition
			// https://bugs.chromium.org/p/chromium/issues/detail?id=882743
			let isClosing = false
			this._closingInterval = setInterval(() => { // No "onclosing" event
				if (this._channel && this._channel.readyState === 'closing') {
					if (isClosing) this._onChannelClose() // closing timed out: equivalent to onclose firing
					isClosing = true
				} else {
					isClosing = false
				}
			}, CHANNEL_CLOSING_TIMEOUT)
		}
	
		_read () {}
	
		_write (chunk, encoding, cb) {
			if (this.destroyed) return cb(errCode(new Error('cannot write after peer is destroyed'), 'ERR_DATA_CHANNEL'))
	
			if (this._connected) {
				try {
					this.send(chunk)
				} catch (err) {
					return this.destroy(errCode(err, 'ERR_DATA_CHANNEL'))
				}
				if (this._channel.bufferedAmount > MAX_BUFFERED_AMOUNT) {
					this._debug('start backpressure: bufferedAmount %d', this._channel.bufferedAmount)
					this._cb = cb
				} else {
					cb(null)
				}
			} else {
				this._debug('write before connect')
				this._chunk = chunk
				this._cb = cb
			}
		}
	
		// When stream finishes writing, close socket. Half open connections are not
		// supported.
		_onFinish () {
			if (this.destroyed) return
	
			// Wait a bit before destroying so the socket flushes.
			// TODO: is there a more reliable way to accomplish this?
			const destroySoon = () => {
				setTimeout(() => this.destroy(), 1000)
			}
	
			if (this._connected) {
				destroySoon()
			} else {
				this.once('connect', destroySoon)
			}
		}
	
		_startIceCompleteTimeout () {
			if (this.destroyed) return
			if (this._iceCompleteTimer) return
			this._debug('started iceComplete timeout')
			this._iceCompleteTimer = setTimeout(() => {
				if (!this._iceComplete) {
					this._iceComplete = true
					this._debug('iceComplete timeout completed')
					this.emit('iceTimeout')
					this.emit('_iceComplete')
				}
			}, this.iceCompleteTimeout)
		}
	
		_createOffer () {
			if (this.destroyed) return
	
			this._pc.createOffer(this.offerOptions)
				.then(offer => {
					if (this.destroyed) return
					if (!this.trickle && !this.allowHalfTrickle) offer.sdp = filterTrickle(offer.sdp)
					offer.sdp = this.sdpTransform(offer.sdp)
	
					const sendOffer = () => {
						if (this.destroyed) return
						const signal = this._pc.localDescription || offer
						this._debug('signal')
						this.emit('signal', {
							type: signal.type,
							sdp: signal.sdp
						})
					}
	
					const onSuccess = () => {
						this._debug('createOffer success')
						if (this.destroyed) return
						if (this.trickle || this._iceComplete) sendOffer()
						else this.once('_iceComplete', sendOffer) // wait for candidates
					}
	
					const onError = err => {
						this.destroy(errCode(err, 'ERR_SET_LOCAL_DESCRIPTION'))
					}
	
					this._pc.setLocalDescription(offer)
						.then(onSuccess)
						.catch(onError)
				})
				.catch(err => {
					this.destroy(errCode(err, 'ERR_CREATE_OFFER'))
				})
		}
	
		_requestMissingTransceivers () {
			if (this._pc.getTransceivers) {
				this._pc.getTransceivers().forEach(transceiver => {
					if (!transceiver.mid && transceiver.sender.track && !transceiver.requested) {
						transceiver.requested = true // HACK: Safari returns negotiated transceivers with a null mid
						this.addTransceiver(transceiver.sender.track.kind)
					}
				})
			}
		}
	
		_createAnswer () {
			if (this.destroyed) return
	
			this._pc.createAnswer(this.answerOptions)
				.then(answer => {
					if (this.destroyed) return
					if (!this.trickle && !this.allowHalfTrickle) answer.sdp = filterTrickle(answer.sdp)
					answer.sdp = this.sdpTransform(answer.sdp)
	
					const sendAnswer = () => {
						if (this.destroyed) return
						const signal = this._pc.localDescription || answer
						this._debug('signal')
						this.emit('signal', {
							type: signal.type,
							sdp: signal.sdp
						})
						if (!this.initiator) this._requestMissingTransceivers()
					}
	
					const onSuccess = () => {
						if (this.destroyed) return
						if (this.trickle || this._iceComplete) sendAnswer()
						else this.once('_iceComplete', sendAnswer)
					}
	
					const onError = err => {
						this.destroy(errCode(err, 'ERR_SET_LOCAL_DESCRIPTION'))
					}
	
					this._pc.setLocalDescription(answer)
						.then(onSuccess)
						.catch(onError)
				})
				.catch(err => {
					this.destroy(errCode(err, 'ERR_CREATE_ANSWER'))
				})
		}
	
		_onConnectionStateChange () {
			if (this.destroyed) return
			if (this._pc.connectionState === 'failed') {
				this.destroy(errCode(new Error('Connection failed.'), 'ERR_CONNECTION_FAILURE'))
			}
		}
	
		_onIceStateChange () {
			if (this.destroyed) return
			const iceConnectionState = this._pc.iceConnectionState
			const iceGatheringState = this._pc.iceGatheringState
	
			this._debug(
				'iceStateChange (connection: %s) (gathering: %s)',
				iceConnectionState,
				iceGatheringState
			)
			this.emit('iceStateChange', iceConnectionState, iceGatheringState)
	
			if (iceConnectionState === 'connected' || iceConnectionState === 'completed') {
				this._pcReady = true
				this._maybeReady()
			}
			if (iceConnectionState === 'failed') {
				this.destroy(errCode(new Error('Ice connection failed.'), 'ERR_ICE_CONNECTION_FAILURE'))
			}
			if (iceConnectionState === 'closed') {
				this.destroy(errCode(new Error('Ice connection closed.'), 'ERR_ICE_CONNECTION_CLOSED'))
			}
		}
	
		getStats (cb) {
			// statreports can come with a value array instead of properties
			const flattenValues = report => {
				if (Object.prototype.toString.call(report.values) === '[object Array]') {
					report.values.forEach(value => {
						Object.assign(report, value)
					})
				}
				return report
			}
	
			// Promise-based getStats() (standard)
			if (this._pc.getStats.length === 0 || this._isReactNativeWebrtc) {
				this._pc.getStats()
					.then(res => {
						const reports = []
						res.forEach(report => {
							reports.push(flattenValues(report))
						})
						cb(null, reports)
					}, err => cb(err))
	
			// Single-parameter callback-based getStats() (non-standard)
			} else if (this._pc.getStats.length > 0) {
				this._pc.getStats(res => {
					// If we destroy connection in `connect` callback this code might happen to run when actual connection is already closed
					if (this.destroyed) return
	
					const reports = []
					res.result().forEach(result => {
						const report = {}
						result.names().forEach(name => {
							report[name] = result.stat(name)
						})
						report.id = result.id
						report.type = result.type
						report.timestamp = result.timestamp
						reports.push(flattenValues(report))
					})
					cb(null, reports)
				}, err => cb(err))
	
			// Unknown browser, skip getStats() since it's anyone's guess which style of
			// getStats() they implement.
			} else {
				cb(null, [])
			}
		}
	
		_maybeReady () {
			this._debug('maybeReady pc %s channel %s', this._pcReady, this._channelReady)
			if (this._connected || this._connecting || !this._pcReady || !this._channelReady) return
	
			this._connecting = true
	
			// HACK: We can't rely on order here, for details see https://github.com/js-platform/node-webrtc/issues/339
			const findCandidatePair = () => {
				if (this.destroyed) return
	
				this.getStats((err, items) => {
					if (this.destroyed) return
	
					// Treat getStats error as non-fatal. It's not essential.
					if (err) items = []
	
					const remoteCandidates = {}
					const localCandidates = {}
					const candidatePairs = {}
					let foundSelectedCandidatePair = false
	
					items.forEach(item => {
						// TODO: Once all browsers support the hyphenated stats report types, remove
						// the non-hypenated ones
						if (item.type === 'remotecandidate' || item.type === 'remote-candidate') {
							remoteCandidates[item.id] = item
						}
						if (item.type === 'localcandidate' || item.type === 'local-candidate') {
							localCandidates[item.id] = item
						}
						if (item.type === 'candidatepair' || item.type === 'candidate-pair') {
							candidatePairs[item.id] = item
						}
					})
	
					const setSelectedCandidatePair = selectedCandidatePair => {
						foundSelectedCandidatePair = true
	
						let local = localCandidates[selectedCandidatePair.localCandidateId]
	
						if (local && (local.ip || local.address)) {
							// Spec
							this.localAddress = local.ip || local.address
							this.localPort = Number(local.port)
						} else if (local && local.ipAddress) {
							// Firefox
							this.localAddress = local.ipAddress
							this.localPort = Number(local.portNumber)
						} else if (typeof selectedCandidatePair.googLocalAddress === 'string') {
							// TODO: remove this once Chrome 58 is released
							local = selectedCandidatePair.googLocalAddress.split(':')
							this.localAddress = local[0]
							this.localPort = Number(local[1])
						}
						if (this.localAddress) {
							this.localFamily = this.localAddress.includes(':') ? 'IPv6' : 'IPv4'
						}
	
						let remote = remoteCandidates[selectedCandidatePair.remoteCandidateId]
	
						if (remote && (remote.ip || remote.address)) {
							// Spec
							this.remoteAddress = remote.ip || remote.address
							this.remotePort = Number(remote.port)
						} else if (remote && remote.ipAddress) {
							// Firefox
							this.remoteAddress = remote.ipAddress
							this.remotePort = Number(remote.portNumber)
						} else if (typeof selectedCandidatePair.googRemoteAddress === 'string') {
							// TODO: remove this once Chrome 58 is released
							remote = selectedCandidatePair.googRemoteAddress.split(':')
							this.remoteAddress = remote[0]
							this.remotePort = Number(remote[1])
						}
						if (this.remoteAddress) {
							this.remoteFamily = this.remoteAddress.includes(':') ? 'IPv6' : 'IPv4'
						}
	
						this._debug(
							'connect local: %s:%s remote: %s:%s',
							this.localAddress,
							this.localPort,
							this.remoteAddress,
							this.remotePort
						)
					}
	
					items.forEach(item => {
						// Spec-compliant
						if (item.type === 'transport' && item.selectedCandidatePairId) {
							setSelectedCandidatePair(candidatePairs[item.selectedCandidatePairId])
						}
	
						// Old implementations
						if (
							(item.type === 'googCandidatePair' && item.googActiveConnection === 'true') ||
							((item.type === 'candidatepair' || item.type === 'candidate-pair') && item.selected)
						) {
							setSelectedCandidatePair(item)
						}
					})
	
					// Ignore candidate pair selection in browsers like Safari 11 that do not have any local or remote candidates
					// But wait until at least 1 candidate pair is available
					if (!foundSelectedCandidatePair && (!Object.keys(candidatePairs).length || Object.keys(localCandidates).length)) {
						setTimeout(findCandidatePair, 100)
						return
					} else {
						this._connecting = false
						this._connected = true
					}
	
					if (this._chunk) {
						try {
							this.send(this._chunk)
						} catch (err) {
							return this.destroy(errCode(err, 'ERR_DATA_CHANNEL'))
						}
						this._chunk = null
						this._debug('sent chunk from "write before connect"')
	
						const cb = this._cb
						this._cb = null
						cb(null)
					}
	
					// If `bufferedAmountLowThreshold` and 'onbufferedamountlow' are unsupported,
					// fallback to using setInterval to implement backpressure.
					if (typeof this._channel.bufferedAmountLowThreshold !== 'number') {
						this._interval = setInterval(() => this._onInterval(), 150)
						if (this._interval.unref) this._interval.unref()
					}
	
					this._debug('connect')
					this.emit('connect')
				})
			}
			findCandidatePair()
		}
	
		_onInterval () {
			if (!this._cb || !this._channel || this._channel.bufferedAmount > MAX_BUFFERED_AMOUNT) {
				return
			}
			this._onChannelBufferedAmountLow()
		}
	
		_onSignalingStateChange () {
			if (this.destroyed) return
	
			if (this._pc.signalingState === 'stable') {
				this._isNegotiating = false
	
				// HACK: Firefox doesn't yet support removing tracks when signalingState !== 'stable'
				this._debug('flushing sender queue', this._sendersAwaitingStable)
				this._sendersAwaitingStable.forEach(sender => {
					this._pc.removeTrack(sender)
					this._queuedNegotiation = true
				})
				this._sendersAwaitingStable = []
	
				if (this._queuedNegotiation) {
					this._debug('flushing negotiation queue')
					this._queuedNegotiation = false
					this._needsNegotiation() // negotiate again
				} else {
					this._debug('negotiated')
					this.emit('negotiated')
				}
			}
	
			this._debug('signalingStateChange %s', this._pc.signalingState)
			this.emit('signalingStateChange', this._pc.signalingState)
		}
	
		_onIceCandidate (event) {
			if (this.destroyed) return
			if (event.candidate && this.trickle) {
				this.emit('signal', {
					type: 'candidate',
					candidate: {
						candidate: event.candidate.candidate,
						sdpMLineIndex: event.candidate.sdpMLineIndex,
						sdpMid: event.candidate.sdpMid
					}
				})
			} else if (!event.candidate && !this._iceComplete) {
				this._iceComplete = true
				this.emit('_iceComplete')
			}
			// as soon as we've received one valid candidate start timeout
			if (event.candidate) {
				this._startIceCompleteTimeout()
			}
		}
	
		_onChannelMessage (event) {
			if (this.destroyed) return
			let data = event.data
			if (data instanceof ArrayBuffer) data = Buffer.from(data)
			this.push(data)
		}
	
		_onChannelBufferedAmountLow () {
			if (this.destroyed || !this._cb) return
			this._debug('ending backpressure: bufferedAmount %d', this._channel.bufferedAmount)
			const cb = this._cb
			this._cb = null
			cb(null)
		}
	
		_onChannelOpen () {
			if (this._connected || this.destroyed) return
			this._debug('on channel open')
			this._channelReady = true
			this._maybeReady()
		}
	
		_onChannelClose () {
			if (this.destroyed) return
			this._debug('on channel close')
			this.destroy()
		}
	
		_onTrack (event) {
			if (this.destroyed) return
	
			event.streams.forEach(eventStream => {
				this._debug('on track')
				this.emit('track', event.track, eventStream)
	
				this._remoteTracks.push({
					track: event.track,
					stream: eventStream
				})
	
				if (this._remoteStreams.some(remoteStream => {
					return remoteStream.id === eventStream.id
				})) return // Only fire one 'stream' event, even though there may be multiple tracks per stream
	
				this._remoteStreams.push(eventStream)
				queueMicrotask(() => {
					this._debug('on stream')
					this.emit('stream', eventStream) // ensure all tracks have been added
				})
			})
		}
	
		_debug () {
			const args = [].slice.call(arguments)
			args[0] = '[' + this._id + '] ' + args[0]
			debug.apply(null, args)
		}
	}
	
	Peer.WEBRTC_SUPPORT = !!getBrowserRTC()
	
	/**
	 * Expose peer and data channel config for overriding all Peer
	 * instances. Otherwise, just set opts.config or opts.channelConfig
	 * when constructing a Peer.
	 */
	Peer.config = {
		iceServers: [
			{
				urls: [
					'stun:stun.l.google.com:19302',
					'stun:global.stun.twilio.com:3478'
				]
			}
		],
		sdpSemantics: 'unified-plan'
	}
	
	Peer.channelConfig = {}
	
	module.exports = Peer
	
	},{"buffer":"buffer","debug":"debug","err-code":28,"get-browser-rtc":29,"queue-microtask":35,"randombytes":36,"readable-stream":51}],57:[function(require,module,exports){
	(function (Buffer){(function (){
	/*! simple-websocket. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
	/* global WebSocket */
	
	const debug = require('debug')('simple-websocket')
	const randombytes = require('randombytes')
	const stream = require('readable-stream')
	const queueMicrotask = require('queue-microtask') // TODO: remove when Node 10 is not supported
	const ws = require('ws') // websockets in node - will be empty object in browser
	
	const _WebSocket = typeof ws !== 'function' ? WebSocket : ws
	
	const MAX_BUFFERED_AMOUNT = 64 * 1024
	
	/**
	 * WebSocket. Same API as node core `net.Socket`. Duplex stream.
	 * @param {Object} opts
	 * @param {string=} opts.url websocket server url
	 * @param {string=} opts.socket raw websocket instance to wrap
	 */
	class Socket extends stream.Duplex {
		constructor (opts = {}) {
			// Support simple usage: `new Socket(url)`
			if (typeof opts === 'string') {
				opts = { url: opts }
			}
	
			opts = Object.assign({
				allowHalfOpen: false
			}, opts)
	
			super(opts)
	
			if (opts.url == null && opts.socket == null) {
				throw new Error('Missing required `url` or `socket` option')
			}
			if (opts.url != null && opts.socket != null) {
				throw new Error('Must specify either `url` or `socket` option, not both')
			}
	
			this._id = randombytes(4).toString('hex').slice(0, 7)
			this._debug('new websocket: %o', opts)
	
			this.connected = false
			this.destroyed = false
	
			this._chunk = null
			this._cb = null
			this._interval = null
	
			if (opts.socket) {
				this.url = opts.socket.url
				this._ws = opts.socket
				this.connected = opts.socket.readyState === _WebSocket.OPEN
			} else {
				this.url = opts.url
				try {
					if (typeof ws === 'function') {
						// `ws` package accepts options
						this._ws = new _WebSocket(opts.url, null, {
							...opts,
							encoding: undefined // encoding option breaks ws internals
						})
					} else {
						this._ws = new _WebSocket(opts.url)
					}
				} catch (err) {
					queueMicrotask(() => this.destroy(err))
					return
				}
			}
	
			this._ws.binaryType = 'arraybuffer'
	
			if (opts.socket && this.connected) {
				queueMicrotask(() => this._handleOpen())
			} else {
				this._ws.onopen = () => this._handleOpen()
			}
	
			this._ws.onmessage = event => this._handleMessage(event)
			this._ws.onclose = () => this._handleClose()
			this._ws.onerror = err => this._handleError(err)
	
			this._handleFinishBound = () => this._handleFinish()
			this.once('finish', this._handleFinishBound)
		}
	
		/**
		 * Send text/binary data to the WebSocket server.
		 * @param {TypedArrayView|ArrayBuffer|Buffer|string|Blob|Object} chunk
		 */
		send (chunk) {
			this._ws.send(chunk)
		}
	
		// TODO: Delete this method once readable-stream is updated to contain a default
		// implementation of destroy() that automatically calls _destroy()
		// See: https://github.com/nodejs/readable-stream/issues/283
		destroy (err) {
			this._destroy(err, () => {})
		}
	
		_destroy (err, cb) {
			if (this.destroyed) return
	
			this._debug('destroy (error: %s)', err && (err.message || err))
	
			this.readable = this.writable = false
			if (!this._readableState.ended) this.push(null)
			if (!this._writableState.finished) this.end()
	
			this.connected = false
			this.destroyed = true
	
			clearInterval(this._interval)
			this._interval = null
			this._chunk = null
			this._cb = null
	
			if (this._handleFinishBound) {
				this.removeListener('finish', this._handleFinishBound)
			}
			this._handleFinishBound = null
	
			if (this._ws) {
				const ws = this._ws
				const onClose = () => {
					ws.onclose = null
				}
				if (ws.readyState === _WebSocket.CLOSED) {
					onClose()
				} else {
					try {
						ws.onclose = onClose
						ws.close()
					} catch (err) {
						onClose()
					}
				}
	
				ws.onopen = null
				ws.onmessage = null
				ws.onerror = () => {}
			}
			this._ws = null
	
			if (err) this.emit('error', err)
			this.emit('close')
			cb()
		}
	
		_read () {}
	
		_write (chunk, encoding, cb) {
			if (this.destroyed) return cb(new Error('cannot write after socket is destroyed'))
	
			if (this.connected) {
				try {
					this.send(chunk)
				} catch (err) {
					return this.destroy(err)
				}
				if (typeof ws !== 'function' && this._ws.bufferedAmount > MAX_BUFFERED_AMOUNT) {
					this._debug('start backpressure: bufferedAmount %d', this._ws.bufferedAmount)
					this._cb = cb
				} else {
					cb(null)
				}
			} else {
				this._debug('write before connect')
				this._chunk = chunk
				this._cb = cb
			}
		}
	
		_handleOpen () {
			if (this.connected || this.destroyed) return
			this.connected = true
	
			if (this._chunk) {
				try {
					this.send(this._chunk)
				} catch (err) {
					return this.destroy(err)
				}
				this._chunk = null
				this._debug('sent chunk from "write before connect"')
	
				const cb = this._cb
				this._cb = null
				cb(null)
			}
	
			// Backpressure is not implemented in Node.js. The `ws` module has a buggy
			// `bufferedAmount` property. See: https://github.com/websockets/ws/issues/492
			if (typeof ws !== 'function') {
				this._interval = setInterval(() => this._onInterval(), 150)
				if (this._interval.unref) this._interval.unref()
			}
	
			this._debug('connect')
			this.emit('connect')
		}
	
		_handleMessage (event) {
			if (this.destroyed) return
			let data = event.data
			if (data instanceof ArrayBuffer) data = Buffer.from(data)
			this.push(data)
		}
	
		_handleClose () {
			if (this.destroyed) return
			this._debug('on close')
			this.destroy()
		}
	
		_handleError (_) {
			this.destroy(new Error(`Error connecting to ${this.url}`))
		}
	
		// When stream finishes writing, close socket. Half open connections are not
		// supported.
		_handleFinish () {
			if (this.destroyed) return
	
			// Wait a bit before destroying so the socket flushes.
			// TODO: is there a more reliable way to accomplish this?
			const destroySoon = () => {
				setTimeout(() => this.destroy(), 1000)
			}
	
			if (this.connected) {
				destroySoon()
			} else {
				this.once('connect', destroySoon)
			}
		}
	
		_onInterval () {
			if (!this._cb || !this._ws || this._ws.bufferedAmount > MAX_BUFFERED_AMOUNT) {
				return
			}
			this._debug('ending backpressure: bufferedAmount %d', this._ws.bufferedAmount)
			const cb = this._cb
			this._cb = null
			cb(null)
		}
	
		_debug () {
			const args = [].slice.call(arguments)
			args[0] = '[' + this._id + '] ' + args[0]
			debug.apply(null, args)
		}
	}
	
	Socket.WEBSOCKET_SUPPORT = !!_WebSocket
	
	module.exports = Socket
	
	}).call(this)}).call(this,require("buffer").Buffer)
	},{"buffer":"buffer","debug":"debug","queue-microtask":35,"randombytes":36,"readable-stream":51,"ws":26}],58:[function(require,module,exports){
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	/*<replacement>*/
	
	var Buffer = require('safe-buffer').Buffer;
	/*</replacement>*/
	
	var isEncoding = Buffer.isEncoding || function (encoding) {
		encoding = '' + encoding;
		switch (encoding && encoding.toLowerCase()) {
			case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
				return true;
			default:
				return false;
		}
	};
	
	function _normalizeEncoding(enc) {
		if (!enc) return 'utf8';
		var retried;
		while (true) {
			switch (enc) {
				case 'utf8':
				case 'utf-8':
					return 'utf8';
				case 'ucs2':
				case 'ucs-2':
				case 'utf16le':
				case 'utf-16le':
					return 'utf16le';
				case 'latin1':
				case 'binary':
					return 'latin1';
				case 'base64':
				case 'ascii':
				case 'hex':
					return enc;
				default:
					if (retried) return; // undefined
					enc = ('' + enc).toLowerCase();
					retried = true;
			}
		}
	};
	
	// Do not cache `Buffer.isEncoding` when checking encoding names as some
	// modules monkey-patch it to support additional encodings
	function normalizeEncoding(enc) {
		var nenc = _normalizeEncoding(enc);
		if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
		return nenc || enc;
	}
	
	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters.
	exports.StringDecoder = StringDecoder;
	function StringDecoder(encoding) {
		this.encoding = normalizeEncoding(encoding);
		var nb;
		switch (this.encoding) {
			case 'utf16le':
				this.text = utf16Text;
				this.end = utf16End;
				nb = 4;
				break;
			case 'utf8':
				this.fillLast = utf8FillLast;
				nb = 4;
				break;
			case 'base64':
				this.text = base64Text;
				this.end = base64End;
				nb = 3;
				break;
			default:
				this.write = simpleWrite;
				this.end = simpleEnd;
				return;
		}
		this.lastNeed = 0;
		this.lastTotal = 0;
		this.lastChar = Buffer.allocUnsafe(nb);
	}
	
	StringDecoder.prototype.write = function (buf) {
		if (buf.length === 0) return '';
		var r;
		var i;
		if (this.lastNeed) {
			r = this.fillLast(buf);
			if (r === undefined) return '';
			i = this.lastNeed;
			this.lastNeed = 0;
		} else {
			i = 0;
		}
		if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
		return r || '';
	};
	
	StringDecoder.prototype.end = utf8End;
	
	// Returns only complete characters in a Buffer
	StringDecoder.prototype.text = utf8Text;
	
	// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
	StringDecoder.prototype.fillLast = function (buf) {
		if (this.lastNeed <= buf.length) {
			buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
			return this.lastChar.toString(this.encoding, 0, this.lastTotal);
		}
		buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
		this.lastNeed -= buf.length;
	};
	
	// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
	// continuation byte. If an invalid byte is detected, -2 is returned.
	function utf8CheckByte(byte) {
		if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
		return byte >> 6 === 0x02 ? -1 : -2;
	}
	
	// Checks at most 3 bytes at the end of a Buffer in order to detect an
	// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
	// needed to complete the UTF-8 character (if applicable) are returned.
	function utf8CheckIncomplete(self, buf, i) {
		var j = buf.length - 1;
		if (j < i) return 0;
		var nb = utf8CheckByte(buf[j]);
		if (nb >= 0) {
			if (nb > 0) self.lastNeed = nb - 1;
			return nb;
		}
		if (--j < i || nb === -2) return 0;
		nb = utf8CheckByte(buf[j]);
		if (nb >= 0) {
			if (nb > 0) self.lastNeed = nb - 2;
			return nb;
		}
		if (--j < i || nb === -2) return 0;
		nb = utf8CheckByte(buf[j]);
		if (nb >= 0) {
			if (nb > 0) {
				if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
			}
			return nb;
		}
		return 0;
	}
	
	// Validates as many continuation bytes for a multi-byte UTF-8 character as
	// needed or are available. If we see a non-continuation byte where we expect
	// one, we "replace" the validated continuation bytes we've seen so far with
	// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
	// behavior. The continuation byte check is included three times in the case
	// where all of the continuation bytes for a character exist in the same buffer.
	// It is also done this way as a slight performance increase instead of using a
	// loop.
	function utf8CheckExtraBytes(self, buf, p) {
		if ((buf[0] & 0xC0) !== 0x80) {
			self.lastNeed = 0;
			return '\ufffd';
		}
		if (self.lastNeed > 1 && buf.length > 1) {
			if ((buf[1] & 0xC0) !== 0x80) {
				self.lastNeed = 1;
				return '\ufffd';
			}
			if (self.lastNeed > 2 && buf.length > 2) {
				if ((buf[2] & 0xC0) !== 0x80) {
					self.lastNeed = 2;
					return '\ufffd';
				}
			}
		}
	}
	
	// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
	function utf8FillLast(buf) {
		var p = this.lastTotal - this.lastNeed;
		var r = utf8CheckExtraBytes(this, buf, p);
		if (r !== undefined) return r;
		if (this.lastNeed <= buf.length) {
			buf.copy(this.lastChar, p, 0, this.lastNeed);
			return this.lastChar.toString(this.encoding, 0, this.lastTotal);
		}
		buf.copy(this.lastChar, p, 0, buf.length);
		this.lastNeed -= buf.length;
	}
	
	// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
	// partial character, the character's bytes are buffered until the required
	// number of bytes are available.
	function utf8Text(buf, i) {
		var total = utf8CheckIncomplete(this, buf, i);
		if (!this.lastNeed) return buf.toString('utf8', i);
		this.lastTotal = total;
		var end = buf.length - (total - this.lastNeed);
		buf.copy(this.lastChar, 0, end);
		return buf.toString('utf8', i, end);
	}
	
	// For UTF-8, a replacement character is added when ending on a partial
	// character.
	function utf8End(buf) {
		var r = buf && buf.length ? this.write(buf) : '';
		if (this.lastNeed) return r + '\ufffd';
		return r;
	}
	
	// UTF-16LE typically needs two bytes per character, but even if we have an even
	// number of bytes available, we need to check if we end on a leading/high
	// surrogate. In that case, we need to wait for the next two bytes in order to
	// decode the last character properly.
	function utf16Text(buf, i) {
		if ((buf.length - i) % 2 === 0) {
			var r = buf.toString('utf16le', i);
			if (r) {
				var c = r.charCodeAt(r.length - 1);
				if (c >= 0xD800 && c <= 0xDBFF) {
					this.lastNeed = 2;
					this.lastTotal = 4;
					this.lastChar[0] = buf[buf.length - 2];
					this.lastChar[1] = buf[buf.length - 1];
					return r.slice(0, -1);
				}
			}
			return r;
		}
		this.lastNeed = 1;
		this.lastTotal = 2;
		this.lastChar[0] = buf[buf.length - 1];
		return buf.toString('utf16le', i, buf.length - 1);
	}
	
	// For UTF-16LE we do not explicitly append special replacement characters if we
	// end on a partial character, we simply let v8 handle that.
	function utf16End(buf) {
		var r = buf && buf.length ? this.write(buf) : '';
		if (this.lastNeed) {
			var end = this.lastTotal - this.lastNeed;
			return r + this.lastChar.toString('utf16le', 0, end);
		}
		return r;
	}
	
	function base64Text(buf, i) {
		var n = (buf.length - i) % 3;
		if (n === 0) return buf.toString('base64', i);
		this.lastNeed = 3 - n;
		this.lastTotal = 3;
		if (n === 1) {
			this.lastChar[0] = buf[buf.length - 1];
		} else {
			this.lastChar[0] = buf[buf.length - 2];
			this.lastChar[1] = buf[buf.length - 1];
		}
		return buf.toString('base64', i, buf.length - n);
	}
	
	function base64End(buf) {
		var r = buf && buf.length ? this.write(buf) : '';
		if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
		return r;
	}
	
	// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
	function simpleWrite(buf) {
		return buf.toString(this.encoding);
	}
	
	function simpleEnd(buf) {
		return buf && buf.length ? this.write(buf) : '';
	}
	},{"safe-buffer":53}],59:[function(require,module,exports){
	(function (global){(function (){
	
	/**
	 * Module exports.
	 */
	
	module.exports = deprecate;
	
	/**
	 * Mark that a method should not be used.
	 * Returns a modified function which warns once by default.
	 *
	 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
	 *
	 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
	 * will throw an Error when invoked.
	 *
	 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
	 * will invoke `console.trace()` instead of `console.error()`.
	 *
	 * @param {Function} fn - the function to deprecate
	 * @param {String} msg - the string to print to the console when `fn` is invoked
	 * @returns {Function} a new "deprecated" version of `fn`
	 * @api public
	 */
	
	function deprecate (fn, msg) {
		if (config('noDeprecation')) {
			return fn;
		}
	
		var warned = false;
		function deprecated() {
			if (!warned) {
				if (config('throwDeprecation')) {
					throw new Error(msg);
				} else if (config('traceDeprecation')) {
					console.trace(msg);
				} else {
					console.warn(msg);
				}
				warned = true;
			}
			return fn.apply(this, arguments);
		}
	
		return deprecated;
	}
	
	/**
	 * Checks `localStorage` for boolean values for the given `name`.
	 *
	 * @param {String} name
	 * @returns {Boolean}
	 * @api private
	 */
	
	function config (name) {
		// accessing global.localStorage can trigger a DOMException in sandboxed iframes
		try {
			if (!global.localStorage) return false;
		} catch (_) {
			return false;
		}
		var val = global.localStorage[name];
		if (null == val) return false;
		return String(val).toLowerCase() === 'true';
	}
	
	}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{}],60:[function(require,module,exports){
	// Returns a wrapper function that returns a wrapped callback
	// The wrapper function should do some stuff, and return a
	// presumably different callback function.
	// This makes sure that own properties are retained, so that
	// decorations and such are not lost along the way.
	module.exports = wrappy
	function wrappy (fn, cb) {
		if (fn && cb) return wrappy(fn)(cb)
	
		if (typeof fn !== 'function')
			throw new TypeError('need wrapper function')
	
		Object.keys(fn).forEach(function (k) {
			wrapper[k] = fn[k]
		})
	
		return wrapper
	
		function wrapper() {
			var args = new Array(arguments.length)
			for (var i = 0; i < args.length; i++) {
				args[i] = arguments[i]
			}
			var ret = fn.apply(this, args)
			var cb = args[args.length-1]
			if (typeof ret === 'function' && ret !== cb) {
				Object.keys(cb).forEach(function (k) {
					ret[k] = cb[k]
				})
			}
			return ret
		}
	}
	
	},{}],"p2p-media-loader-hlsjs":[function(require,module,exports){
	"use strict";
	/**
	 * @license Apache-2.0
	 * Copyright 2018 Novage LLC.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
			if (k2 === undefined) k2 = k;
			Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
			if (k2 === undefined) k2 = k;
			o[k2] = m[k];
	}));
	var __exportStar = (this && this.__exportStar) || function(m, exports) {
			for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.initJwPlayer = exports.initMediaElementJsPlayer = exports.initVideoJsHlsJsPlugin = exports.initVideoJsContribHlsJsPlayer = exports.initFlowplayerHlsJsPlayer = exports.initClapprPlayer = exports.initHlsJsPlayer = exports.version = void 0;
	/* eslint-disable */
	exports.version = "0.6.2";
	__exportStar(require("./engine"), exports);
	__exportStar(require("./segment-manager"), exports);
	function initHlsJsPlayer(player) {
			if (player && player.config && player.config.loader && typeof player.config.loader.getEngine === "function") {
					initHlsJsEvents(player, player.config.loader.getEngine());
			}
	}
	exports.initHlsJsPlayer = initHlsJsPlayer;
	function initClapprPlayer(player) {
			player.on("play", () => {
					const playback = player.core.getCurrentPlayback();
					if (playback._hls && !playback._hls._p2pm_linitialized) {
							playback._hls._p2pm_linitialized = true;
							initHlsJsPlayer(player.core.getCurrentPlayback()._hls);
					}
			});
	}
	exports.initClapprPlayer = initClapprPlayer;
	function initFlowplayerHlsJsPlayer(player) {
			player.on("ready", () => { var _a; return initHlsJsPlayer((_a = player.engine.hlsjs) !== null && _a !== void 0 ? _a : player.engine.hls); });
	}
	exports.initFlowplayerHlsJsPlayer = initFlowplayerHlsJsPlayer;
	function initVideoJsContribHlsJsPlayer(player) {
			player.ready(() => {
					const options = player.tech_.options_;
					if (options &&
							options.hlsjsConfig &&
							options.hlsjsConfig.loader &&
							typeof options.hlsjsConfig.loader.getEngine === "function") {
							initHlsJsEvents(player.tech_, options.hlsjsConfig.loader.getEngine());
					}
			});
	}
	exports.initVideoJsContribHlsJsPlayer = initVideoJsContribHlsJsPlayer;
	function initVideoJsHlsJsPlugin() {
			if (videojs == undefined || videojs.Html5Hlsjs == undefined) {
					return;
			}
			videojs.Html5Hlsjs.addHook("beforeinitialize", (videojsPlayer, hlsjs) => {
					if (hlsjs.config && hlsjs.config.loader && typeof hlsjs.config.loader.getEngine === "function") {
							initHlsJsEvents(hlsjs, hlsjs.config.loader.getEngine());
					}
			});
	}
	exports.initVideoJsHlsJsPlugin = initVideoJsHlsJsPlugin;
	function initMediaElementJsPlayer(mediaElement) {
			mediaElement.addEventListener("hlsFragChanged", (event) => {
					const hls = mediaElement.hlsPlayer;
					if (hls && hls.config && hls.config.loader && typeof hls.config.loader.getEngine === "function") {
							const engine = hls.config.loader.getEngine();
							if (event.data && event.data.length > 1) {
									const frag = event.data[1].frag;
									const byteRange = frag.byteRange.length !== 2
											? undefined
											: { offset: frag.byteRange[0], length: frag.byteRange[1] - frag.byteRange[0] };
									engine.setPlayingSegment(frag.url, byteRange, frag.start, frag.duration);
							}
					}
			});
			mediaElement.addEventListener("hlsDestroying", async () => {
					const hls = mediaElement.hlsPlayer;
					if (hls && hls.config && hls.config.loader && typeof hls.config.loader.getEngine === "function") {
							const engine = hls.config.loader.getEngine();
							await engine.destroy();
					}
			});
			mediaElement.addEventListener("hlsError", (event) => {
					const hls = mediaElement.hlsPlayer;
					if (hls && hls.config && hls.config.loader && typeof hls.config.loader.getEngine === "function") {
							if (event.data !== undefined && event.data.details === "bufferStalledError") {
									const engine = hls.config.loader.getEngine();
									engine.setPlayingSegmentByCurrentTime(hls.media.currentTime);
							}
					}
			});
	}
	exports.initMediaElementJsPlayer = initMediaElementJsPlayer;
	function initJwPlayer(player, hlsjsConfig) {
			const iid = setInterval(() => {
					if (player.hls && player.hls.config) {
							clearInterval(iid);
							Object.assign(player.hls.config, hlsjsConfig);
							initHlsJsPlayer(player.hls);
					}
			}, 200);
	}
	exports.initJwPlayer = initJwPlayer;
	function initHlsJsEvents(player, engine) {
			player.on("hlsFragChanged", (_event, data) => {
					const frag = data.frag;
					const byteRange = frag.byteRange.length !== 2
							? undefined
							: { offset: frag.byteRange[0], length: frag.byteRange[1] - frag.byteRange[0] };
					engine.setPlayingSegment(frag.url, byteRange, frag.start, frag.duration);
			});
			player.on("hlsDestroying", async () => {
					await engine.destroy();
			});
			player.on("hlsError", (_event, errorData) => {
					if (errorData.details === "bufferStalledError") {
							const htmlMediaElement = (player.media === undefined
									? player.el_ // videojs-contrib-hlsjs
									: player.media); // all others
							if (htmlMediaElement) {
									engine.setPlayingSegmentByCurrentTime(htmlMediaElement.currentTime);
							}
					}
			});
	}
	
	},{"./engine":3,"./segment-manager":5}]},{},[1]);