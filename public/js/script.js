const defHeaders = {
  'Content-Type': 'application/json',
};
// const BASE_URL = 'http://localhost:3000';
const BASE_URL = location.origin;

function getCookie(name) {
  const cookie = {};
  document.cookie.split(';').forEach((el) => {
    const [k, v] = el.split('=');
    cookie[k.trim()] = v;
  });
  return cookie[name];
}

function showLogoutBtn() {
  document.getElementById('register-dropdown').classList.add('hide');
  document.getElementById('login-dropdown').classList.add('hide');
  document.getElementById('logout-btn').classList.remove('hide');
}

function toggleLogoutBtn() {
  document.getElementById('register-dropdown').classList.toggle('hide');
  document.getElementById('login-dropdown').classList.toggle('hide');
  document.getElementById('logout-btn').classList.toggle('hide');
  [...document.getElementsByClassName('dropdown')].forEach((el) => el.classList.remove('open'));
}

function create(tag) {
  return document.createElement(tag);
}

async function showTable(table) {
  table.getElementsByTagName('thead')[0].classList.remove('hide');
  const tableData = await fetch(`${BASE_URL}/saves`, {
    headers: defHeaders,
  }).then((res) => res.json());
  const tbody = table.getElementsByTagName('tbody')[0];
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
  tableData.forEach((obj) => {
    delete obj.id;
    delete obj.userId;
    const tr = create('tr');
    const keys = Object.keys(obj).filter(e => e !== 'waterNeeded');
    keys.push('waterNeeded');
    keys.forEach((key) => {
      const el = create('td');
      el.innerText = obj[key];
      tr.appendChild(el);
    });
    tbody.appendChild(tr);
  });
  document.body.appendChild(table);
}

document.addEventListener('DOMContentLoaded', async () => {

  const input = create('input');
  input.placeholder = 'people amount';
  input.style.color = 'black';
  input.style.borderColor = 'black';
  input.className = 'form-control';
  input.setAttribute('type', 'number');
  input.setAttribute('onkeydown', 'return event.keyCode !== 69');
  input.style.marginTop = '10px';
  const input2 = create('input');
  input2.style.color = 'black';
  input2.style.borderColor = 'black';
  input2.placeholder = 'time spent (hours)';
  input2.className = 'form-control';
  input2.setAttribute('type', 'number');
  input2.setAttribute('onkeydown', 'return event.keyCode !== 69');
  input2.style.marginTop = '10px';
  const input3 = create('input');
  input3.style.color = 'black';
  input3.style.borderColor = 'black';
  input3.placeholder = 'air temperature °C';
  input3.className = 'form-control';
  input3.setAttribute('type', 'number');
  input3.setAttribute('onkeydown', 'return event.keyCode !== 69');
  input3.style.marginTop = '10px';
  const checkbox = create('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'checkboxid';
  const label = create('label');
  label.htmlFor = 'checkboxid';
  label.appendChild(document.createTextNode('Outdoor Activities / Exercises'));
  const input4 = create('input');
  input4.style.color = 'black';
  input4.style.borderColor = 'black';
  input4.placeholder = 'alcoholic drinks(litre)';
  input4.className = 'form-control';
  input4.setAttribute('type', 'number');
  input4.setAttribute('onkeydown', 'return event.keyCode !== 69');
  const input5 = create('input');
  input5.style.color = 'black';
  input5.style.borderColor = 'black';
  input5.placeholder = 'alc concentration';
  input5.className = 'form-control';
  input5.setAttribute('type', 'number');
  input5.setAttribute('onkeydown', 'return event.keyCode !== 69');
  const div1 = create('div');
  const wrapDiv = create('div');
  wrapDiv.className = 'row';
  div1.className = 'form-group col-sm-6';
  div1.style.marginTop = '10px';
  const div2 = create('div');
  div2.style.marginTop = '10px';
  div2.className = 'form-inline';
  const button = create('button');
  button.style.display = 'block';
  button.innerText = 'count';
  button.className = 'btn btn-success';
  const buttonPlus = create('button');
  buttonPlus.className = 'btn btn-success';
  buttonPlus.innerText = '+';
  buttonPlus.style.width = '3em';
  const div3 = create('div');
  div3.style.display = 'block';
  div3.style.marginTop = '10px';
  div3.className = 'form-inline';
  const div4 = create('div');
  const h1 = create('h1');

  const table = create('table');
  table.classList.add('table');
  const thead = create('thead');
  const headerRow = ['amount','time','alcvolume','alc%' , 'air temperature','waterNeeded'];
  const trHeader = create('tr');
  headerRow.forEach((val) => {
    const el = create('th');
    el.innerText = val;
    el.scope = 'col';
    trHeader.appendChild(el);
  });
  thead.appendChild(trHeader);
  const tbody = create('tbody');
  table.appendChild(thead);
  table.appendChild(tbody);


  function plusTmp() {
    const div = create('div');
    div.style.display = 'block';
    div.className = 'form-inline';
    div.style.marginTop = '10px';
    const inputPlus1 = create('input');
    inputPlus1.style.color = 'black';
    inputPlus1.style.borderColor = 'black';
    inputPlus1.placeholder = 'alcoholic drinks(litre)';
    inputPlus1.className = 'form-control valueLitr';
    inputPlus1.setAttribute('onkeydown', 'return event.keyCode !== 69');
    inputPlus1.setAttribute('type', 'number');
    const inputPlus2 = create('input');
    inputPlus2.style.color = 'black';
    inputPlus2.style.borderColor = 'black';
    inputPlus2.placeholder = 'alc concentration';
    inputPlus2.className = 'form-control valueConc';
    inputPlus2.setAttribute('type', 'number');
    inputPlus2.setAttribute('onkeydown', 'return event.keyCode !== 69');
    const buttonMinus = create('button');
    buttonMinus.className = 'btn btn-success';
    buttonMinus.innerText = '-';
    buttonMinus.style.width = '3em';
    div3.appendChild(div);
    div.appendChild(inputPlus1);
    div.appendChild(inputPlus2);
    div.appendChild(buttonMinus);
    buttonMinus.onclick = () => {
      div.parentNode.removeChild(div);
    };
  }
  div1.appendChild(input);
  div1.appendChild(input2);
  div1.appendChild(input3);
  wrapDiv.appendChild(div1);
  document.body.appendChild(wrapDiv);
  document.body.appendChild(div2);
  div1.appendChild(checkbox);
  div1.appendChild(label);
  div2.appendChild(input4);
  div2.appendChild(input5);
  div2.appendChild(buttonPlus);
  document.body.appendChild(div3);
  document.body.appendChild(button);
  document.body.appendChild(div4);

  buttonPlus.onclick = () => {
    plusTmp();
  };
  button.onclick = async () => {
    const amount = input.value;
    const time = input2.value;
    const temp = input3.value;
    let buhl = input4.value;
    let alc = input5.value;
    const a = document.getElementsByClassName('valueLitr');
    [...a].forEach((valueLitr) => {
      if (!isNaN(valueLitr)) {
        buhl += valueLitr;
      }
    });
    const b = document.getElementsByClassName('valueConc');
    [...b].forEach((valueConc) => {
      if (!isNaN(valueConc)) {
        alc = (alc + valueConc) / 2;
      }
    });

    if (
      !isNaN(amount)
      && !isNaN(time)
      && !isNaN(temp)
      && !isNaN(buhl)
      && !isNaN(alc)
    ) {
      const tempcoef = Math.max(0.05 * temp, 0.8);
      let sportcoef = 1;
      if (checkbox.checked) {
        sportcoef = 1.5;
      }
      const wat = buhl - 0.01 * alc * buhl;
      let alcoef = (0.01 * alc * buhl * 5 - wat) * 1000;
      // if (alc < 15) {
      //   alcoef = 0;
      // }
      let waterNeeded = Math.round(
        (2 * (140 * amount * time * tempcoef * sportcoef + alcoef)) / 1000,
      )
        / 2;
        if(waterNeeded <= 0){waterNeeded = 0}
      h1.innerText = `u shud take ${waterNeeded} liters of drinking water`;
      div4.appendChild(h1);
      const obj = {
        amount, time, buhl, alc, waterNeeded, temp,
      };
      const json = JSON.stringify(obj);
      console.log(json);
      const res = await fetch(`${BASE_URL}/saves`, {
        method: 'POST',
        headers: defHeaders,
        body: json,
      });
      await showTable(table);
    } 
  };
  [...document.getElementsByTagName('input')].forEach(
    (input) => (input.onclick = () => {
      input.style.color = 'black';
      input.style.borderColor = 'black';
    }),
  );

  document.getElementById('register-submit').onclick = async (e) => {
    e.preventDefault();
    document.getElementById('register-error').innerText =""

    const pass = document.getElementById('password').value;
    const confpass = document.getElementById('confirm-password').value;
    const usrn = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    
    if (pass !== confpass) {
      document.getElementById('register-error').innerText = "passwords don't match";
      document.getElementById('register-error').style.color = 'red';
      document.getElementById('password').style.borderColor = 'red';
    }
    
    

    if (usrn.length === 0) {
      document.getElementById('username').style.borderColor = 'red';
      return
    }
    if (email.length === 0) {
      document.getElementById('email').style.borderColor = 'red';
      return
    }
    if (pass.length === 0) {
      document.getElementById('password').style.borderColor = 'red';
      return
    }
    if (confpass.length === 0) {
      document.getElementById('confirm-password').style.borderColor = 'red';
      return
    }
    if (
      pass === confpass
      && pass.length !== 0
      && email.length !== 0
      && usrn.length !== 0
    ) {

          const res = await fetch(`${BASE_URL}/register`, {
          method: 'POST',
          headers: defHeaders,
          body: JSON.stringify({ username: usrn, email, password: pass }),
          });
          if(!res.ok) {
            document.getElementById('register-error').innerText =await res.text() 
            document.getElementById('register-error').style.color = 'red';
          }
    } else if (email.length > 0) {
      document.getElementById('email').value = 'it is used already';
      document.getElementById('email').style.color = 'red';
      document.getElementById('email').style.bordercolor = 'red';
    } else if (usrn.length > 0) {
      document.getElementById('username').value = 'it is used already';
      document.getElementById('username').style.color = 'red';
      document.getElementById('username').style.bordercolor = 'red';
    }
  };

  document.getElementById('login-submit').onclick = async (e) => {
    e.preventDefault();
    document.getElementById('login-error').innerText =""

    const passl = document.getElementById('passwordl').value;
    const usrnl = document.getElementById('usernamel').value;
    if (passl.length === 0) {
      document.getElementById('passwordl').style.borderColor = 'red';
    }
    if (usrnl.length === 0) {
      document.getElementById('usernamel').style.borderColor = 'red';
    }
    if (usrnl.length !== 0 && passl.length !== 0) {
      const userlog = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({
          username: usrnl,
          password: passl,
          remember: document.getElementById('remember').checked,
        }),
        headers: defHeaders,
      })
        if(!userlog.ok) {
          document.getElementById('login-error').innerText =await userlog.text() 
          document.getElementById('login-error').style.color = 'red';
        } else {
          toggleLogoutBtn();
          await showTable(table);
        }
    }
  };

  document.getElementById('logout-btn').onclick = () => {
    document.cookie = 'zapuserid= ; max-age=-1';
    toggleLogoutBtn();
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    thead.classList.add('hide');
  };
  if (getCookie('zapuserid')) {
    showLogoutBtn();
    await showTable(table);
  }
});
