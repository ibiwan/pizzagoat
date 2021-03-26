const awilix = require('awilix');

const express = require('express');
const fs = require('fs');

const { asValue } = awilix;

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  express: asValue(express),
  fs: asValue(fs),
});

container.loadModules([
  'src/controllers/**/*.js',
  'src/entities/**/*.js',
  'src/routers/**/*.js',
  'src/services/*.js',
  'src/utilities/*.js',
]);

module.exports = container;
