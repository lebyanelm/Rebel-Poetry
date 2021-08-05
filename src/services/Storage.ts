export const Storage = {
  set: (name: string, data: any) => {
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
};
