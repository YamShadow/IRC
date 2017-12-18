$(document).ready(function() {

    var listMembers = new Vue({
        el: '#connectedMembers',
        data: {
            members: [
                { id: 1, pseudo: 'John Doe 1', avatar: 'http://data-cache.abuledu.org/1024/icone-de-coq-5049c8fe.jpg'},
                { id: 2, pseudo: 'John Doe 2', avatar: 'http://data-cache.abuledu.org/1024/icone-de-coq-5049c8fe.jpg'},
                { id: 3, pseudo: 'John Doe 3', avatar: 'http://data-cache.abuledu.org/1024/icone-de-coq-5049c8fe.jpg'}
            ],
            name: '',
        },
        methods: {
            addMember: function() {
                if(this.name.length != 0) {
                    connectedMembers.members.push({ pseudo: this.name })
                    this.name = ''
                }
            }
        }
    });


    // Salon et ajout de salon
    var vueSalons = Vue.extend({
        template: '<ul><li v-for="salon in salons">{{ salon }}</li></ul>',
        data: function() {
            return {
                salons: ['first salon',
                'sescond salon',
                'third salon'
                ]
            };
        },
        methods: {
            addSalon: function(input) {
                this.salons.push(input);
            }
        }
    });

    var vm = new Vue({
        el: '#salonsList',
        components: {
            'vue-salon': vueSalons
        }
    });

    $('.addSalon').on('click', function() {
        $('#modalAddSalon').show();
        $('.filter').show();
        $('#inputNewSalon').val('');
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

    $('.fa-cog').on('click', function() {
        $('#modalParameters').show();
        $('.filter').show();
    });

    document.getElementById("addNewSalon").onclick = function () {
        var input = $('#inputNewSalon').val();
        var errorMessage = $('.errorMessage');
        vm.$refs.foo.addSalon(input);
        if(input == '') {
            $(errorMessage).show();
        } else {
            $('#input').val('');
            $('#modalAddSalon').hide();
            $('.filter').hide();
            $(errorMessage).hide();
        }
    };

    // Fin salon et ajout salon //

    $('.closeModal').click(function() {
        var modal = $(this).closest('.modal');
        modal.hide();
        $('.filter').hide();
    });


    var profilPseudo = $('#modalUsers').find('.profilPseudo');
    var profilAvatar = $('#modalUsers').find('.profilAvatar');
    $('#connectedMembers li').each(function() {
        $(this).click(function() {
            var id = $(this).attr('id');
            var pseudo = $(this).attr('pseudo');
            var avatar = $(this).attr('avatar');
            $(profilPseudo).html(pseudo);
            $(profilPseudo).attr('data-id', id);
            $(profilAvatar).attr('src', avatar);
            $('#modalUsers').show();
            $('.filter').show();
        });
    });

});
