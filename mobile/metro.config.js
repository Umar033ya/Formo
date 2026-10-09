const fs = require('fs');
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Metro 0.84 + Node 24 can leave the dev transformer undefined when worker
// threads are enabled. Expo export is unaffected, but Expo Go dev bundling
// fails on the first transform request. Keep dev bundling on the stable path.
config.transformer.unstable_workerThreads = false;

// This repository keeps dependencies in mobile/node_modules only. Expo can
// infer the parent workspace as a second node_modules path, but that folder
// does not exist here and Metro 0.84 fails while stat-ing it in dev mode.
config.resolver.nodeModulesPaths = [
  path.join(__dirname, 'node_modules'),
  path.join(__dirname, '..', 'node_modules'),
].filter(fs.existsSync);

// Expo also discovers workspace folders from the repository root. Keep only
// directories that are present on this checkout; otherwise Metro fails before
// the first request with a misleading `transformFile` error.
config.watchFolders = config.watchFolders.filter(fs.existsSync);

module.exports = config;
