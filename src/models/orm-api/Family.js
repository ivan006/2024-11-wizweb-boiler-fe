import MyBaseModel from 'src/models/helpers/MyBaseModel';
import VueCookies from 'vue-cookies';
import User from 'src/models/User';
import Attendance from 'src/models/orm-api/Attendance';
import Child from 'src/models/orm-api/Child';
import FamilyLink from 'src/models/orm-api/FamilyLink';
import SchoolFamilyEnrollment from 'src/models/orm-api/SchoolFamilyEnrollment';
import PrivateEvent from "src/models/orm-api/PrivateEvent";

export default class Family extends MyBaseModel {
    static entity = 'family';
    static entityUrl = '/api/families';
    static primaryKey = 'id';
    static titleKey = 'name';
    static entityHumanName = 'Family';
    static openRecord(pVal, item, router){
      router.push({
        name: '/lists/families/:rId/:rName',
        params: {
          rId: pVal,
          rName: item.name,
        },
      })
    }

    static parentWithables = [
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


    static hooks = {
        createComplete: (response) => {
          console.log('help')
          console.log(response.response.data.data)


          const session = VueCookies.get('VITE_AUTH');
          return User.Update(
            {
              id: session.user.id,
              primary_family_id: response.response.data.data.id,
            },
            [],
            {},
            {}
          )
          .then((response) => {
            session.user = response.response.data.data

            const expireDate = new Date(session.expireDate);  // Parse expireDate from the cookie's content
            const now = new Date();

            const durationInSeconds = Math.floor((expireDate - now) / 1000);

            VueCookies.set('VITE_AUTH', session, `${durationInSeconds}s`);
          })
          .catch((err) => {
            // this.formServerErrors = err.response.data;
            // this.$emit("editComplete");
          });
        },
    };

    static fieldsMetadata = {
        'id': {},
            'name': {},

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
            'creator_id': this.attr('').nullable(),
            'updater_id': this.attr('').nullable(),
            'created_at': this.attr('').nullable(),
            'updated_at': this.attr('').nullable(),
            'creator': this.belongsTo(User, 'creator_id'),
            'updater': this.belongsTo(User, 'updater_id'),
            'attendances': this.hasMany(Attendance, 'family_id'),
            'private_events': this.hasMany(PrivateEvent, 'family_id'),
            'children': this.hasMany(Child, 'family_id'),
            'FamilyLinks': this.hasMany(FamilyLink, 'family_id'),
            'schoolFamilyEnrollments': this.hasMany(SchoolFamilyEnrollment, 'family_id')
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
