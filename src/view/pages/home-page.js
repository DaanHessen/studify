import { CurrentDate } from '../components/current-date';
const dateElement = document.querySelectorAll('.current-date') || [];
dateElement.forEach((element) => {
// eslint-disable-next-line no-new
new CurrentDate(element);
});
