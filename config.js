// Paste your Apps Script web app URL between the quotes (it ends in /exec).
window.BOTTLE_API = "https://script.google.com/macros/s/AKfycby4FiradjHB5jGecQne6-617zDA6sTJ3Vo8BVjPj34NxSWSz8BdulZ17atNSGdf4l7LgQ/exec";

window.bottleApi = async function (action, data) {
  if (!window.BOTTLE_API || window.BOTTLE_API.indexOf("PASTE_") === 0) {
    throw new Error("The app isn't connected yet. Add the web app URL to config.js.");
  }
  var res = await fetch(window.BOTTLE_API, {
    method: "POST",
    body: JSON.stringify(Object.assign({ action: action }, data || {}))
  });
  var json = await res.json();
  if (!json.ok) {
    var err = new Error(json.error || "Something went wrong.");
    err.data = json;
    throw err;
  }
  return json;
};

window.bottleStore = {
  get: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
  set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  del: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
};
