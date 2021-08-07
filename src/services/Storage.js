export const Storage = {
  set: (name, data) => {
    return new Promise((resolve, reject) => {
      try {
        if (data && data.constructor !== String) {
          if (data.constructor === Array || data.constructor === Object) {
            data = JSON.stringify(data, null, 2);
          } else {
            data = data.toString();
          }
        }
        localStorage.setItem(name, data);
        resolve([name, data]);
      } catch (error) {
        console.error(error);
        reject("Something went wrong while saving data");
      }
    });
  },

  get: (name, isJSON = false) => {
    return new Promise((resolve, reject) => {
      try {
        const data = localStorage.getItem(name);
        if (isJSON) {
          resolve(JSON.parse(data));
        } else {
          resolve(data);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  },

  remove: (name) => {
    return new Promise((resolve, reject) => {
      try {
        localStorage.removeItem(name);
        resolve();
      } catch(error) {
        console.error(error);
        reject(error);
      }
    });
  }
};
