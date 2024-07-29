const base_url = "https://dummyjson.com/";

/* 
endpoint: name of endpoint

success: callbackk
*/
async function getData(endpoint) {
  try {
    const res = await fetch(`https://dummyjson.com/${endpoint}`);
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    return err;
  }
}

export async function getManyRequests(uihandlers, requestConfig) {
  const { startLoading, error, stopLoading } = uihandlers;
  startLoading();
  try {
    const mappedRequests = requestConfig.map((item) => getData(item.endpoint));
    const res = await Promise.all(mappedRequests);
    // console.log(res); sha8alll
    res.forEach((item, index) => {
      // console.log(item); sha8aalll
      if (item instanceof Error) throw new Error("Something went wrong");
      requestConfig[index].success(item);
      // console.log(requestConfig[index].success); 
    });
    // console.log(res); sha8all
    return res;
  } catch (e) {
    error(e);
  } finally {
    stopLoading();
  }
}

//logic of handelRemoteRequest
export default async function handelRemoteRequest(
  endpoint,
  success,
  error,
  startLoading,
  stopLoading
) {
  startLoading(); //4th param
  try {
    const res = await fetch(`${base_url}${endpoint}`); //first param
    if (res.ok) {
      const data = await res.json();
      success(data); //second parameter
      return data; // return the data object
    } else {
      throw new Error("something went wrong");
    }
  } catch (e) {
    console.log(e);
    error(e); // third parameter
  } finally {
    stopLoading(); // 5th parameter
  }
}
export function hello(){

}
