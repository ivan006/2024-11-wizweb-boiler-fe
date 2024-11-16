import MyBaseModel from 'src/models/helpers/MyBaseModel';
import VueCookies from 'vue-cookies';
import Child from 'src/models/orm-api/Child';
import User from 'src/models/User';
import Event from 'src/models/orm-api/Event';
import Family from 'src/models/orm-api/Family';
import School from 'src/models/orm-api/School';

export default class Attendance extends MyBaseModel {
    static entity = 'attendance';
    static entityUrl = '/api/attendances';
    static primaryKey = 'id';
    static titleKey = 'id';
    static entityHumanName = 'Attendance';
    static openRecord(pVal, item, router){
      router.push({
        name: '/lists/attendances/:rId/:rName',
        params: {
          rId: pVal,
          rName: pVal,
        },
      })
    }

    static parentWithables = [
        'school',
        'family',
        'event',
        'child',
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
        'school_id': {
          autoFill(item){
            const rel = Event.query().where('id', item.event_id).first();
            if (rel){
              return rel.school_id ? rel.school_id : null
            } else {
              return null
            }
          }
        },
        'family_id': {
          autoFill(item){
            const rel = Child.query().where('id', item.child_id).first();
            if (rel){
              return rel.family_id ? rel.family_id : null
            } else {
              return null
            }
          }
        },
        'event_id': { linkablesRule: () => { return {} } },
        'child_id': {
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
          'event_id': this.attr(''),
          'child_id': this.attr(''),
          'family_id': this.attr('').nullable(),
          'school_id': this.attr('').nullable(),
          'creator_id': this.attr('').nullable(),
          'updater_id': this.attr('').nullable(),
          'created_at': this.attr('').nullable(),
          'updated_at': this.attr('').nullable(),
          'child': this.belongsTo(Child, 'child_id'),
          'creator': this.belongsTo(User, 'creator_id'),
          'event': this.belongsTo(Event, 'event_id'),
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
