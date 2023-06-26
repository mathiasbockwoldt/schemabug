const requestSchema = {
  type: 'object',
  properties: {
    definition: {
      oneOf: [
        {
          oneOf: [
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  const: 'modelAsObject'
                },
                model: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string'
                    },
                    version: {
                      type: 'string'
                    },
                  },
                  required: [
                    'name',
                    'version'
                  ],
                  additionalProperties: false
                }
              },
              required: [
                'type',
                'model'
              ],
              additionalProperties: false
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  const: 'modelAsString'
                },
                xmodel: {
                  type: 'string'
                },
                version: {
                  type: 'string'
                }
              },
              required: [
                'type',
                'xmodel',
                'version',
              ],
              additionalProperties: false
            },
          ]
        }
      ]
    }
  },
  required: [
    'definition'
  ],
  additionalProperties: false,
  $schema: 'http://json-schema.org/draft-07/schema#'
};

module.exports = requestSchema;
