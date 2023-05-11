'use strict';

/**
 * n-cut service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::n-cut.n-cut');
