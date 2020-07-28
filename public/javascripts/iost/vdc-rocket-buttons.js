const d = 40;

document.querySelectorAll('.rocket-button').forEach(elem => {

    elem.querySelectorAll('.default, .success > div').forEach(text => {
        charming(text);
        text.querySelectorAll('span').forEach((span, i) => {
            span.innerHTML = span.textContent == ' ' ? '&nbsp;' : span.textContent;
            span.style.setProperty('--d', i * d + 'ms');
            span.style.setProperty('--ds', text.querySelectorAll('span').length * d - d - i * d + 'ms');
        });
    });
});

const button = document.getElementById("vdc1-deposit-btn");
button.addEventListener('click', e => {
    if(!$("#vdc1-deposit-btn").hasClass('disabled')) {
        e.preventDefault();
        if (button.classList.contains('animated')) {
            button.classList.remove('animated');
            // return;
        }
        button.classList.add('animated');
        button.classList.toggle('live');
        setTimeout(() => {
            button.classList.remove('animated');
        }, 500);

        setTimeout(() => {
            button.classList.remove('live');
        }, 2400);
    }
});

const button1 = document.getElementById("vdc1-withdraw-btn");
button1.addEventListener('click', e => {
    if(!$("#vdc1-withdraw-btn").hasClass('disabled')) {
        e.preventDefault();
        if (button1.classList.contains('animated')) {
            button1.classList.remove('animated');
            // return;
        }
        button1.classList.add('animated');
        button1.classList.toggle('live');
        setTimeout(() => {
            button1.classList.remove('animated');
        }, 500);

        setTimeout(() => {
            button1.classList.remove('live');
        }, 2400);
    }
});

const button2 = document.getElementById("vdc2-deposit-btn");
button2.addEventListener('click', e => {
    if(!$("#vdc2-deposit-btn").hasClass('disabled')) {
        e.preventDefault();
        if (button2.classList.contains('animated')) {
            button2.classList.remove('animated');
            // return;
        }
        button2.classList.add('animated');
        button2.classList.toggle('live');
        setTimeout(() => {
            button2.classList.remove('animated');
        }, 500);

        setTimeout(() => {
            button2.classList.remove('live');
        }, 2400);
    }
});

const button3 = document.getElementById("vdc2-withdraw-btn");
button3.addEventListener('click', e => {
    if(!$("#vdc2-withdraw-btn").hasClass('disabled')) {
        e.preventDefault();
        if (button3.classList.contains('animated')) {
            button3.classList.remove('animated');
            // return;
        }
        button3.classList.add('animated');
        button3.classList.toggle('live');
        setTimeout(() => {
            button3.classList.remove('animated');
        }, 500);

        setTimeout(() => {
            button3.classList.remove('live');
        }, 2400);
    }
});

const button4 = document.getElementById("vdc1-claim-btn");
button4.addEventListener('click', e => {
    if(!$("#vdc1-claim-btn").hasClass('disabled')) {
        e.preventDefault();
        if (button4.classList.contains('animated')) {
            button4.classList.remove('animated');
            // return;
        }
        button4.classList.add('animated');
        button4.classList.toggle('live');
        setTimeout(() => {
            button4.classList.remove('animated');
        }, 500);

        setTimeout(() => {
            button4.classList.remove('live');
        }, 2400);
    }
});

const button5 = document.getElementById("vdc2-claim-btn");
button5.addEventListener('click', e => {
    if(!$("#vdc2-claim-btn").hasClass('disabled')) {
        e.preventDefault();
        if (button5.classList.contains('animated')) {
            button5.classList.remove('animated');
            // return;
        }
        button5.classList.add('animated');
        button5.classList.toggle('live');
        setTimeout(() => {
            button5.classList.remove('animated');
        }, 500);

        setTimeout(() => {
            button5.classList.remove('live');
        }, 2400);
    }
});