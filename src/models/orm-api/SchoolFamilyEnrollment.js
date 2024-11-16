import MyBaseModel from 'src/models/helpers/MyBaseModel';
import VueCookies from 'vue-cookies';
import User from 'src/models/User';
import Family from 'src/models/orm-api/Family';
import School from 'src/models/orm-api/School';

export default class SchoolFamilyEnrollment extends MyBaseModel {
    static entity = 'schoolfamilyenrollment';
    static entityUrl = '/api/school-family-enrollments';
    static primaryKey = 'id';
    static titleKey = 'id';
    static entityHumanName = 'SchoolFamilyEnrollment';
    static openRecord(pVal, item, router){
      router.push({
        name: '/lists/school-family-enrollments/:rId/:rName',
        params: {
          rId: pVal,
          rName: pVal,
        },
      })
    }

    static parentWithables = [
        'family',
        'school',
        'creator',
        'updater'
    ];

    static rules = {
        readables: () => true,
        readable: (item) => false,
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
            'family_id': { linkablesRule: () => { return {} } },
            'school_id': { linkablesRule: () => { return {} } },

        'creator_id': {
          autoFill(item){
            const session = VueCookies.get('VITE_AUTH');
            if (item.creator_id){
              return item.creator_id
            } else {
              return session?.user.id
            }
          }
        },

        'updater_id': {
          autoFill(item){
            const session = VueCookies.get('VITE_AUTH');
            return session?.user.id
          }
        },

        'created_at': {
          autoFill(item){
            if (item.created_at){
              return item.created_at
            } else {
              const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
              return currentTimestamp
            }
          }
        },
        'updated_at': {
          autoFill(item){
            const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
            return currentTimestamp
          }
        },
    };

    static fields() {
        return {
            'id': this.attr('').nullable(),
            'family_id': this.attr('').nullable(),
            'school_id': this.attr('').nullable(),
            'creator_id': this.attr('').nullable(),
            'updater_id': this.attr('').nullable(),
            'created_at': this.attr('').nullable(),
            'updated_at': this.attr('').nullable(),
            'creator': this.belongsTo(User, 'creator_id'),
            'family': this.belongsTo(Family, 'family_id'),
            'school': this.belongsTo(School, 'school_id'),
            'updater': this.belongsTo(User, 'updater_id')
        };
    }



    static FetchAll(relationships = [], flags = {}, moreHeaders = {}, options = { page: 1, limit: 15, filters: {}, clearPrimaryModelOnly: false }) {
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
