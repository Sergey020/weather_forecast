

  const search = document.querySelector(".js-search");
  search.addEventListener('submit', onSearch);
  const list = document.querySelector(".js-list");

  function onSearch(event) {
    event.preventDefault()

    const { query, days } = event.currentTarget.elements
    getWeather(query.value, days.value)
      .then((data) => (list.innerHTML = creatMarkup(data.forecast.forecastday)))
      .catch((err) => console.log(err));
  }
  function getWeather(citi, days) {
    //http://api.weatherapi.com/v1/forecast.json?key=e87029b2dd004ec0bae120544240604&q=Paris&days=5
    const BASE_URL = "http://api.weatherapi.com/v1";
    const API_KEY = "e87029b2dd004ec0bae120544240604";
    // const params = new URLSearchParams({
    //     key: API_KEY,
    //     q: citi,
    //     days: days,
    //     lang: 'uk'
    // })
//console.log(params.toString());

  return fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${citi}&days=${days}&lang=uk`
  ).then((resp) => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}


function creatMarkup(arr) {
    return arr.map(({date, day:{avgtemp_c, condition: {icon, text}}})=>`<li>
    <img src="${icon}" alt="${text}">
    <p>${text}</p>
     <h2>${date}</h2>
    <h3>${avgtemp_c}</h3>
</li>`).join('')
}