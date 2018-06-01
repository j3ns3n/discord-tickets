const initDB = (r) => {
  r.dbList().run((conn, callback) => {
    if (!callback.includes('ticketbot')) {
      r.dbCreate('ticketbot').run((conn, callback) => {
        r = r.db('ticketbot');
        r.tableCreate('tickets').run(() => {
          r.table('tickets').insert({id: '0', case: '0', channel: '0'}).run();
          r.table('tickets').indexCreate('case').run();
        });
        r.tableCreate('chatlogs').run(() => {
          r.table('chatlogs').indexCreate('secret').run();
        });
      });
    } else {
      r = r.db('ticketbot');
      r.tableList().run((conn, callback) => {
        if (!callback.includes('tickets')) {
          r.tableCreate('tickets').run();
          r.table('tickets').indexCreate('case').run();
        }
        if (!callback.includes('chatlogs')) {
          r.tableCreate('chatlogs').run();
        }
      });
    }
  });
}

module.exports = initDB;
