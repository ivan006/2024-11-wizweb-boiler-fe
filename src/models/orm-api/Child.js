import MyBaseModel from 'src/models/helpers/MyBaseModel';
import VueCookies from 'vue-cookies';
import User from 'src/models/User';
import Family from 'src/models/orm-api/Family';
import Attendance from 'src/models/orm-api/Attendance';

export default class Child extends MyBaseModel {
    static entity = 'child';
    static entityUrl = '/api/children';
    static primaryKey = 'id';
    static titleKey = 'name';
    static entityHumanName = 'Child';
    static openRecord(pVal, item, router){
      router.push({
        name: '/lists/children/:rId/:rName',
        params: {
          rId: pVal,
          rName: pVal,
        },
      })
    }

    static parentWithables = [
        'family',
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
        'family_id': {
          linkablesRule(item){
            const session = VueCookies.get('VITE_AUTH');
            if (!session) return {id: 0}
            const familyIds = session.user.family_memberships.map(membership => membership.family_id);
            familyIds.push(session.user.primary_family.id);
            const familyIdsString = familyIds.join(',');
            return {
              id: familyIds.length ? familyIdsString : 0
            }
          },
        },

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
            'name': this.attr(''),
            'family_id': this.attr(''),
            'creator_id': this.attr('').nullable(),
            'updater_id': this.attr('').nullable(),
            'created_at': this.attr('').nullable(),
            'updated_at': this.attr('').nullable(),
            'creator': this.belongsTo(User, 'creator_id'),
            'family': this.belongsTo(Family, 'family_id'),
            'updater': this.belongsTo(User, 'updater_id'),
            'attendances': this.hasMany(Attendance, 'child_id')
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
