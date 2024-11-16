import MyBaseModel from 'src/models/helpers/MyBaseModel';
import {FieldUsageTypes} from 'quicklists-vue-orm-ui'
import LocationCountry from "src/models/orm-api/LocationCountry";
import LocationState from "src/models/orm-api/LocationState";
import LocationSubstate from "src/models/orm-api/LocationSubstate";
import LocationTown from "src/models/orm-api/LocationTown";
import VueCookies from "vue-cookies";

export default class LocationSuburb extends MyBaseModel {
  static entity = 'LocationSuburb';
  static entityUrl = '/api/location-suburbs';
  static primaryKey = 'id';
  static titleKey = 'name';
  static entityHumanName = 'LocationSuburb';

  static openRecord(pVal, item, router) {
    // router.push({
    //   name: '/lists/location-suburbs/:rId/:rName',
    //   params: {
    //     rId: pVal,
    //     rName: pVal,
    //   },
    // })
  }

  static parentWithables = [
    // 'school',
  ];

  static rules = {
    readables: () => true,
    readable: (item) => true,
    editable: (item) => true,
      creatable: () => {
        const session = VueCookies.get('VITE_AUTH');
        return !!session
      },
  };

  static fieldsMetadata = {
    'id': {},
    'name': {},
    'town': {},
    'town_id': {
      linkablesRule: () => {
        return {}
      },
      usageType: FieldUsageTypes.mapExtraRelLocality(),
    },
    'created_at': {
      autoFill(item) {
        if (item.created_at) {
          return item.created_at
        } else {
          const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
          return currentTimestamp
        }
      }
    },
    'updated_at': {
      autoFill(item) {
        const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
        return currentTimestamp
      }
    },
  };

  static fields() {
    return {
      'id': this.attr('').nullable(),
      'name': this.attr(''),
      'town': this.belongsTo(LocationTown, 'town_id'),
      'town_id': this.attr('').nullable(),
      'created_at': this.attr('').nullable(),
      'updated_at': this.attr('').nullable(),
    };
  }


  static FetchAll(relationships = [], flags = {}, moreHeaders = {}, options = {
    page: 1,
    limit: 15,
    filters: {},
    clearPrimaryModelOnly: false
  }) {
    return this.customSupabaseApiFetchAll(
      `${this.baseUrl}${this.entityUrl}`,
      [...this.parentWithables, ...relationships],
      flags,
      this.mergeHeaders(moreHeaders),
      options,
      this
    );
  }

  static FetchById(id, relationships = [], flags = {}, moreHeaders = {}) {
    return this.customSupabaseApiFetchById(
      `${this.baseUrl}${this.entityUrl}`,
      id,
      [...this.parentWithables, ...relationships],
      flags,
      this.mergeHeaders(moreHeaders),
      this
    );
  }

  static Store(entity, relationships = [], flags = {}, moreHeaders = {}) {
    return this.customSupabaseApiStore(
      `${this.baseUrl}${this.entityUrl}`,
      entity,
      [...this.parentWithables, ...relationships],
      flags,
      this.mergeHeaders(moreHeaders),
      this
    );
  }

  static Update(entity, relationships = [], flags = {}, moreHeaders = {}) {
    return this.customSupabaseApiUpdate(
      `${this.baseUrl}${this.entityUrl}`,
      entity,
      [...this.parentWithables, ...relationships],
      flags,
      this.mergeHeaders(moreHeaders),
      this
    );
  }

  static Delete(entityId, flags = {}, moreHeaders = {}) {
    return this.customSupabaseApiDelete(
      `${this.baseUrl}${this.entityUrl}`,
      entityId,
      flags,
      this.mergeHeaders(moreHeaders),
      this
    );
  }
}
