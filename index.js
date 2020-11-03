const melodies = [
    { q: 'beep' },
    { w: 'wind alarm' },
    { e: 'door sound' },
    { a: 'paper rip' },
    { s: 'switch' },
    { d: 'kitchen sounds' },
    { z: 'billiard balls' },
    { x: 'frisbee catch' },
    { c: 'ping pong' }
];

const bankMelodies = [
    {
        q: 'pedal braking',
        sourse: 'https://actions.google.com/sounds/v1/transportation/pedal_braking.ogg'
    },
    {
        w: 'drill gear',
        sourse: 'https://actions.google.com/sounds/v1/tools/drill_gear.ogg'
    },
    {
        e: 'drill burst',
        sourse: 'https://actions.google.com/sounds/v1/tools/medium_drill_burst.ogg'
    },
    {
        a: 'ratchet wrench',
        sourse: 'https://actions.google.com/sounds/v1/tools/ratchet_wrench_slow.ogg'
    },
    {
        s: 'first into glove',
        sourse: 'https://actions.google.com/sounds/v1/sports/fist_into_glove.ogg'
    },
    {
        d: 'football',
        sourse: 'https://actions.google.com/sounds/v1/sports/football_kick_in_grass.ogg'
    },
    {
        z: 'football kick',
        sourse: 'https://actions.google.com/sounds/v1/sports/football_punts.ogg'
    },
    {
        x: 'baseball',
        sourse: 'https://actions.google.com/sounds/v1/sports/metal_bat_hits_baseball.ogg'
    },
    {
        c: 'metal rolling',
        sourse: 'https://actions.google.com/sounds/v1/sports/metal_dropped_rolling.ogg'
    },
];

const prevMelodies = [
    {
        q: 'beep',
        sourse: 'https://actions.google.com/sounds/v1/alarms/beep_short.ogg"'
    },
    {
        w: 'wind alarm',
        sourse: 'https://actions.google.com/sounds/v1/alarms/winding_alarm_clock.ogg'
    },
    {
        e: 'door sound',
        sourse: 'https://actions.google.com/sounds/v1/doors/locked_doorknob_jiggle.ogg'
    },
    {
        a: 'paper rip',
        sourse: 'https://actions.google.com/sounds/v1/foley/paper_ripping.ogg'
    },
    {
        s: 'switch',
        sourse: 'https://actions.google.com/sounds/v1/tools/18v_cordless_drill_switch.ogg'
    },
    {
        d: 'kitchen sounds',
        sourse: 'https://actions.google.com/sounds/v1/household/kitchen_noises.ogg'
    },
    {
        z: 'billiard balls',
        sourse: 'https://actions.google.com/sounds/v1/sports/billiard_balls_hit.ogg'
    },
    {
        x: 'frisbee catch',
        sourse: 'https://actions.google.com/sounds/v1/sports/frisbee_catch.ogg'
    },
    {
        c: 'ping pong',
        sourse: 'https://actions.google.com/sounds/v1/sports/ping_pong_ball_hit.ogg'
    },
];

$(document).ready(function () {
    // buttons decoration
    $('.drum-pad').mousedown(function () {
        $(this).addClass('drum-pad-click');
    });
    $('.drum-pad').mouseup(function () {
        $(this).removeClass('drum-pad-click');
    });

    let letter = '';
    $('.drum-pad').mouseenter(function () {
        letter = $(this).html();
        $(this).html('<i class="fa fa-play"></i>');
    });

    $('.drum-pad').mouseleave(function () {
        $(this).html(letter);
    });

    // switch to another sound bank
    $('#on-2').click(function () {
        $(this).data('clicked', true);
        $('#off-2').data('clicked', false);
    });

    $('#off-2').click(function () {
        $(this).data('clicked', true);
        $('#on-2').data('clicked', false);
    });

    // buttons click and audio play
    $('.drum-pad').click(function () {
        let id = $(this).parent().prev().attr('id').toLowerCase(); // for output;

        // bank on
        if ($('#on-2').data('clicked')) {
            let result = bankMelodies.filter(item => item.hasOwnProperty(id));
            let sourceUrl = result[0].sourse;
            $(this).parent().prev().attr('src', sourceUrl);
            output(bankMelodies, id);
        }

        // bank off
        if ($('#off-2').data('clicked')) {
            let result = prevMelodies.filter(item => item.hasOwnProperty(id));
            let sourceUrl = result[0].sourse;
            $(this).parent().prev().attr('src', sourceUrl);
            output(prevMelodies, id);
        }

        let audio = $(this).parent().prev()[0];
        audio.play();
        if (!$('#on-2').data('clicked') && !$('#off-2').data('clicked'))
            output(melodies, id);
    });

    // key press
    $(document).keypress(function () {
        let key = event.key.toLowerCase();
        let audio = document.getElementById(key.toUpperCase());

        if (audio) {

            // bank on
            if ($('#on-2').data('clicked')) {
                let result = bankMelodies.filter(item => item.hasOwnProperty(key));
                let sourceUrl = result[0].sourse;
                audio.setAttribute('src', sourceUrl);
                output(bankMelodies, key);
            }

            // bank off
            if ($('#off-2').data('clicked')) {
                let result = prevMelodies.filter(item => item.hasOwnProperty(key));
                let sourceUrl = result[0].sourse;
                audio.setAttribute('src', sourceUrl);
                output(prevMelodies, key);
            }

            audio.play();
            if (!$('#on-2').data('clicked') && !$('#off-2').data('clicked'))
                output(melodies, key);
        } else {
            $('#range-value').html('no melody found');
        }

        if ($('#off').data('off'))
            $('#range-value').html('sound disabled');
    });

    // range and volume control
    let players = document.querySelectorAll('.audio-player');
    console.log(players);
    console.log(players[1]);
    $('#range').on('input', function () {
        let value = $(this).val(); // this.value -- so it was previously
        $('#range-value').html(value);
        for (let player of players)
            player.volume = value * 0.01;
    });

    // sound off
    $('#off').click(function () {
        $(this).data('off', true);
        $('#range-value').html('sound disabled');
        for (let player of players)
            player.volume = 0.0;
        if ($('#range').prop("disabled") === false) {
            $('#range').prop("disabled", true);
        }
    });

    // sound on
    $('#on').click(function () {
        if ($('#off').data('off')) {
            $('#off').data('off', false);
            $('#range-value').html('sound enabled');
        }
        let value = $('#range').val();
        for (let player of players)
            player.volume = value * 0.01;
        if ($('#range').prop("disabled") === true) {
            $('#range').prop("disabled", false);
        }
    });

    // print key press or button click result in display
    function output(arr, value) {
        let result = arr.filter(item => item.hasOwnProperty(value));
        if ($('#off').data('off'))
            $('#range-value').html('sound disabled');
        else if (result.length)
            $('#range-value').html(result[0][value]);
    }
});