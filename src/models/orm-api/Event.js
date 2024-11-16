import MyBaseModel from 'src/models/helpers/MyBaseModel';
import VueCookies from 'vue-cookies';
import User from 'src/models/User';
import School from 'src/models/orm-api/School';
import Attendance from 'src/models/orm-api/Attendance';
import {FieldUsageTypes} from 'quicklists-vue-orm-ui'
import LocationSuburb from "src/models/orm-api/LocationSuburb";
import LocationCountry from "src/models/orm-api/LocationCountry";
import LocationState from "src/models/orm-api/LocationState";
import LocationSubstate from "src/models/orm-api/LocationSubstate";
import LocationTown from "src/models/orm-api/LocationTown";

export default class Event extends MyBaseModel {
  static entity = 'event';
  static entityUrl = '/api/events';
  static primaryKey = 'id';
  static titleKey = 'name';
  static entityHumanName = 'Event';

  static openRecord(pVal, item, router) {
    router.push({
      name: '/lists/events/:rId/:rName',
      params: {
        rId: pVal,
        rName: pVal,
      },
    })
  }

  static parentWithables = [
    'school',
    'creator',
    'updater'
  ];

  static rules = {
    readables: () => true,
    readable: (item) => true,
    editable: (item) => {
      const session = VueCookies.get('VITE_AUTH');
      return item.creator_id === session?.user.id
    },
    creatable: () => {
      const session = VueCookies.get('VITE_AUTH');
      return !!session
    },
  };

  static fieldsMetadata = {
    'id': {},
    'name': {},
    'image': {
      usageType: 'fileImageType'
    },
    'start_datetime': {
      usageType: FieldUsageTypes.timeRangeStart(),
    },
    'end_datetime': {
      usageType: FieldUsageTypes.timeRangeEnd(),
    },
    'school_id': {
      // linkablesRule: () => {
      //   return {}
      // }

      linkablesRule(item){
        const session = VueCookies.get('VITE_AUTH');
        if (!session) return {id: 0}
        return {
          creator_id: session.user.id
        }
      },
    },
    'creator_id': {
      autoFill(item) {
        const session = VueCookies.get('VITE_AUTH');
        if (item.creator_id) {
          return item.creator_id
        } else {
          return session?.user.id
        }
      }
    },
    'updater_id': {
      autoFill(item) {
        const session = VueCookies.get('VITE_AUTH');
        return session?.user.id
      }
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


    'location_google_id': {
      usageType: FieldUsageTypes.mapExtraPlaceID(),
    },
    'location_address_street_address': {
      usageType: FieldUsageTypes.mapExtraFormattedAddress(),
    },
    'location_address_building_address': {
      // usageType: FieldUsageTypes.mapExtraGeoLocLong(),
    },
    'location_address_place_name': {
      usageType: FieldUsageTypes.location_address_place_name(),
    },
    'location_coordinates_longitude': {
      usageType: FieldUsageTypes.mapExtraGeoLocLong(),
    },
    'location_coordinates_latitude': {
      usageType: FieldUsageTypes.mapExtraGeoLocLat(),
    },


    'country': {},
    'location_admin_division_country_id': {
      linkablesRule: () => {
        return {}
      },
      usageType: FieldUsageTypes.mapExtraRelCountry(),
    },
    'state': {},
    'location_admin_division_state_id': {
      linkablesRule: () => {
        return {}
      },
      usageType: FieldUsageTypes.mapExtraRelAdminArea1(),
    },
    'substate': {},
    'location_admin_division_substate_id': {
      linkablesRule: () => {
        return {}
      },
      usageType: FieldUsageTypes.mapExtraRelAdminArea2(),
    },
    'town': {},
    'location_admin_division_town_id': {
      linkablesRule: () => {
        return {}
      },
      usageType: FieldUsageTypes.mapExtraRelLocality(),
    },
    'suburb': {},
    'location_admin_division_suburb_id': {
      linkablesRule: () => {
        return {}
      },
      usageType: FieldUsageTypes.mapExtraRelSublocality(),
    },

  };

  static fields() {
    return {
      'id': this.attr('').nullable(),
      'name': this.attr(''),
      'image': this.attr(''),
      'start_datetime': this.attr(''),
      'end_datetime': this.attr(''),
      'school_id': this.attr(''),
      'creator_id': this.attr('').nullable(),
      'updater_id': this.attr('').nullable(),
      'created_at': this.attr('').nullable(),
      'updated_at': this.attr('').nullable(),
      'creator': this.belongsTo(User, 'creator_id'),
      'school': this.belongsTo(School, 'school_id'),
      'updater': this.belongsTo(User, 'updater_id'),
      'attendances': this.hasMany(Attendance, 'event_id'),

      'location_google_id': this.attr('').nullable(),
      'location_address_street_address': this.attr('').nullable(),
      'location_address_building_address': this.attr('').nullable(),
      'location_address_place_name': this.attr('').nullable(),
      'location_coordinates_longitude': this.attr('').nullable(),
      'location_coordinates_latitude': this.attr('').nullable(),
      'country': this.belongsTo(LocationCountry, 'location_admin_division_country_id'),
      'location_admin_division_country_id': this.attr('').nullable(),
      'state': this.belongsTo(LocationState, 'location_admin_division_state_id'),
      'location_admin_division_state_id': this.attr('').nullable(),
      'substate': this.belongsTo(LocationSubstate, 'location_admin_division_substate_id'),
      'location_admin_division_substate_id': this.attr('').nullable(),
      'town': this.belongsTo(LocationTown, 'location_admin_division_town_id'),
      'location_admin_division_town_id': this.attr('').nullable(),
      'suburb': this.belongsTo(LocationSuburb, 'location_admin_division_suburb_id'),
      'location_admin_division_suburb_id': this.attr('').nullable(),
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
