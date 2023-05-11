'use strict';

/**
 * yes-no service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::yes-no.yes-no');
