$(document).ready(function() {
    var listSalons = new Vue({
        el: '#salonsList',
        data: {
            salons: [
                { text: 'Salon 1'},
                { text: 'Salon 2'},
                { text: 'Salon 3'},
                { text: 'Salon 4'},
                { text: 'Salon 5'},
                { text: 'Salon 6'}
            ],
            name: '',
        },
        methods: {
            addSalon: function() {
                if(this.name.length != 0) {
                    listSalons.salons.push({ text: this.name })
                    this.name = ''
                }
            }
        }
    });

    var listMembers = new Vue({
        el: '#connectedMembers',
        data: {
            members: [
                { text: 'John Doe 1'},
                { text: 'John Doe 2'},
                { text: 'John Doe 3'}
            ],
            name: '',
        },
        methods: {
            addMember: function() {
                if(this.name.length != 0) {
                    connectedMembers.members.push({ text: this.name })
                    this.name = ''
                }
            }
        }
    });

    $('.addSalon').on('click', function() {
        $('#modalAddSalon').toggle();
    });

    $("[data-typer]").attr("data-typer", function(i, txt) {
        var $typer = $(this),
        tot = txt.length,
        pauseMax = 300,
        pauseMin = 60,
        ch = 0;
    
        (function typeIt() {
            if (ch > tot) return;
            $typer.text(txt.substring(0, ch++));
            setTimeout(typeIt, ~~(Math.random() * (pauseMax - pauseMin + 1) + pauseMin));
        }());
    
    });
});