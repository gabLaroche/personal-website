import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import localeString from './localeString';
import project from './project';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
      localeString,
      project
  ])
})
