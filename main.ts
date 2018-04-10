import { setInterval } from 'timers';
import * as $ from 'jquery';

$('h1').css('color', 'red');

interface HttpService {
  getServerTime(): Promise<number>;
}

class MockHttpService implements HttpService {
  getServerTime(): Promise<number> {
    const time = Date.now();
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(time + 2000);
      }, 1000);
    });
  }
}

const httpService: HttpService = new MockHttpService();
setInterval(async () => {
  const serverTime = await httpService.getServerTime();
  const localTime = Date.now();

  const localTimeLabel = document.getElementById('local-time');
  const serverTimeLabel = document.getElementById('server-time');

  const localTimeText = new Date(localTime).toLocaleTimeString();
  const serverTimeText = new Date(serverTime).toLocaleTimeString();

  localTimeLabel.innerText = localTimeText;
  serverTimeLabel.innerText = serverTimeText;

}, 1000);

