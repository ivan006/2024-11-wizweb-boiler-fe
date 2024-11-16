import MyBaseModel from 'src/models/helpers/MyBaseModel';
import VueCookies from 'vue-cookies';
import Attendance from 'src/models/orm-api/Attendance';
import Child from 'src/models/orm-api/Child';
import Event from 'src/models/orm-api/Event';
import Family from 'src/models/orm-api/Family';
import FamilyLink from 'src/models/orm-api/FamilyLink';
import SchoolFamilyEnrollment from 'src/models/orm-api/SchoolFamilyEnrollment';
import Job from 'src/models/orm-api/Job';
import School from 'src/models/orm-api/School';

export default class User extends MyBaseModel {
  static entity = 'user';
  static entityUrl = '/api/users';
  static primaryKey = 'id';
  static entityHumanName = 'User';
  static titleKey = 'name';
  static openRecord(pVal, item, router){
    router.push({
      name: '/lists/users/:rId/:rName',
      params: {
        rId: pVal,
        rName: pVal,
      },
    })
  }

  static parentWithables = [
    'primary_family'
  ];

  static rules = {
    readables: () => true,
    readable: (item) => true,
    editable: (item) => {
      const session = VueCookies.get('VITE_AUTH');
      return item.id === session?.user.id
    },
    creatable: () => false,
  };

  static fieldsMetadata = {
    'id': {},
    'old_id': {},
    'name': {},
    // 'email': {},
    // 'email_verified_at': {},
    // 'password': {},
    // 'status': {},
    // 'remember_token': {},
    'primary_family_id': {
      linkablesRule(item){
        const session = VueCookies.get('VITE_AUTH');
        if (!session) return {id: 0}
        return {
          creator_id: session.user.id
        }
      },
    },

        'created_at': {
          autoFill(item){
            if (item.created_at){
              return item.created_at
            } else {
              const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
              return currentTimestamp
            }
          },
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
      'old_id': this.attr('').nullable(),
      'name': this.attr(''),
      'primary_family_id': this.attr('').nullable(),
      'primary_family': this.belongsTo(Family, 'primary_family_id'),
      // 'email': this.attr('').nullable(),
      // 'email_verified_at': this.attr('').nullable(),
      // 'password': this.attr('').nullable(),
      // 'status': this.attr('').nullable(),
      // 'remember_token': this.attr('').nullable(),
      'created_at': this.attr('').nullable(),
      'updated_at': this.attr('').nullable(),
      'attendances': this.hasMany(Attendance, 'creator_id'),
      'attendancesUpdaterId': this.hasMany(Attendance, 'updater_id'),
      'children': this.hasMany(Child, 'creator_id'),
      'childrenUpdaterId': this.hasMany(Child, 'updater_id'),
      'events': this.hasMany(Event, 'creator_id'),
      'eventsUpdaterId': this.hasMany(Event, 'updater_id'),
      'families': this.hasMany(Family, 'creator_id'),
      'familiesUpdaterId': this.hasMany(Family, 'updater_id'),
      'FamilyLinks': this.hasMany(FamilyLink, 'user_id'),
      'schoolFamilyEnrollments': this.hasMany(SchoolFamilyEnrollment, 'creator_id'),
      'schoolFamilyEnrollmentsUpdaterId': this.hasMany(SchoolFamilyEnrollment, 'updater_id'),
      'jobs': this.hasMany(Job, 'user_id'),
      'schools': this.hasMany(School, 'creator_id'),
      'schoolsUpdaterId': this.hasMany(School, 'updater_id')
    };
  }

  static templateListGrid = {
    // Define templateListGrid
  };

  static templateOverview = {
    // Define templateOverview
  };

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

  static Register(entity, relationships = [], flags = {}, moreHeaders = {}) {
    return this.customSupabaseApiStore(
      `${this.baseUrl}/api/register`,
      entity,
      [...this.parentWithables, ...relationships],
      flags,
      this.mergeHeaders(moreHeaders),
      this
    );
  }
}
