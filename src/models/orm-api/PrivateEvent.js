import MyBaseModel from 'src/models/helpers/MyBaseModel';
import VueCookies from 'vue-cookies';
import User from 'src/models/User';
import Family from 'src/models/orm-api/Family';
import {FieldUsageTypes} from 'quicklists-vue-orm-ui'

export default class PrivateEvent extends MyBaseModel {
  static entity = 'private-event';
  static entityUrl = '/api/private-events';
  static primaryKey = 'id';
  static titleKey = 'name';
  static entityHumanName = 'Private Event';

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
    'family',
    'creator',
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
    'description': {},
    'start_datetime': {
      usageType: FieldUsageTypes.timeRangeStart(),
    },
    'end_datetime': {
      usageType: FieldUsageTypes.timeRangeEnd(),
    },
    'family_id': {
      linkablesRule(item){
        const session = VueCookies.get('VITE_AUTH');
        if (!session) return {id: 0}

        const familyIds = session.user.family_memberships.map(membership => membership.family_id);
        familyIds.push(session.user.primary_family.id);
        const familyIdsString = familyIds.join(',');
        return {
          family_id: familyIds.length ? familyIdsString : 0
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
      'description': this.attr(''),
      'start_datetime': this.attr(''),
      'end_datetime': this.attr(''),
      'family_id': this.attr(''),
      'family': this.belongsTo(Family, 'family_id'),
      'creator_id': this.attr('').nullable(),
      'creator': this.belongsTo(User, 'creator_id'),
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
