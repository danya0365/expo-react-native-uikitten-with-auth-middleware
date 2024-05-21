import moment from 'moment';
import 'moment/locale/th';

moment.locale('th');

export namespace DateHelper {
  export const dateTimeToString = (dateText: string) => {
    return moment
      .utc(dateText, 'YYYY-MM-DD HH:mm:ss', true)
      .toDate()
      .toUTCString();
  };

  export const now = () => {
    return moment.utc().toDate().toUTCString();
  };

  export const addDays = (days: number) => {
    return moment.utc().add(`${days}`, 'days').toDate().toUTCString();
  };

  export const dateToFromNow = (dateString: string) => {
    return moment(dateString).fromNow();
  };

  export const dateToFromNowDaily = (dateString: string) => {
    return moment(dateString).calendar(null, {
      // when the date is closer, specify custom values
      //lastWeek: '[สัปดาห์ที่แล้ว] dddd, HH:mm',
      lastDay: '[เมื่อวานนี้], HH:mm',
      sameDay: '[วันนี้], HH:mm',
      nextDay: '[พรุ่งนี้], HH:mm',
      //nextWeek: 'dddd, HH:mm',
      // when the date is further away, use from-now functionality
      sameElse: function () {
        if (moment().isSame(dateString, 'year')) {
          return moment(dateString).format('ddd D MMMM, HH:mm');
        }
        const dateFormat = 'D MMMM YYYY, HH:mm';
        const fullDateTime = moment(dateString).format(dateFormat);
        return '[' + fullDateTime + ']';
      }
    });
  };

  export const dateToFromNowDailyWithoutTime = (dateString: string) => {
    return moment(dateString).calendar(null, {
      // when the date is closer, specify custom values
      //lastWeek: '[สัปดาห์ที่แล้ว] dddd, HH:mm',
      lastDay: '[เมื่อวานนี้], HH:mm',
      sameDay: '[วันนี้], HH:mm',
      nextDay: '[พรุ่งนี้], HH:mm',
      //nextWeek: 'dddd, HH:mm',
      // when the date is further away, use from-now functionality
      sameElse: function () {
        const dateFormat = 'D MMMM YYYY';
        const fullDateTime = moment(dateString).format(dateFormat);
        if (moment().isSame(dateString, 'year')) {
          return moment(dateString).format('D MMMM');
        }
        return '[' + fullDateTime + ']';
      }
    });
  };
}
