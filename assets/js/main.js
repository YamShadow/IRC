$(document).ready(function() {

    // Users connected
    
    var listMembers = new Vue({
        el: '#connectedMembers',
        data: {
            members: [],
        },
        created () {
            this.buildMembers();
            this.timer = setInterval(this.buildMembers, 1000)
        },
        methods: {
            buildMembers: function() {
                var self = this
                $.ajax({
                    method: 'POST',
                    url: 'ajax.php?action=usersInSalon',
                    data: {
                        salon_id: 1
                    }
                }).done(function (data) {
                    self.members = data;
                });
            }
        }
    });


    // Salon et ajout de salon
    var vueSalons = Vue.extend({
        template: '<ul><li v-for="salon in salons"><a :href="url + salon.nom">{{ salon.nom }}</a></li></ul>',
        data: function() {
            return {
                salons: [],
                url: 'index.php?action=chat&room='
            };
        },
        created () {
            this.buildSalons()
        },
        methods: {
            buildSalons: function() {
                var self = this
                $.ajax({
                    method: 'POST',
                    url: 'ajax.php?action=listSalons',
                }).done(function (data) {
                    var salons = data;
                    for(salon in salons) {
                        self.salons.push(salons[salon]);
                    }
                });
                
            },
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
    $('#connectedMembers').on('click', 'li', function() {
        var id = $(this).attr('id');
        var pseudo = $(this).attr('pseudo');
        var avatar = $(this).attr('avatar');
        $(profilPseudo).html(pseudo);
        $(profilPseudo).attr('data-id', id);
        $(profilAvatar).attr('src', avatar);
        $('#modalUsers').show();
        $('.filter').show();
    });

    // Toggle menus
    $('.toggleConnected').click(function() {
        $('#connectedMembers').toggle();
        if($('#salonsList').css('display') == 'block' && $('#connectedMembers').css('display') == 'block' && $(window).width() < 900) {
            $('#salonsList').css('display', 'none');
        }
    });

    $('.toggleSalons').click(function() {
        $('#salonsList').toggle();
        if($('#connectedMembers').css('display') == 'block' && $('#salonsList').css('display') == 'block' && $(window).width() < 900) {
            $('#connectedMembers').css('display', 'none');
        }
    });

});

$(window).resize(function() {
    if ($(window).width() < 900) {
        $('#salonsList').css('display', 'none');
     }
     else {
        $('#salonsList').css('display', 'block');
     }

     if ($(window).width() < 750) {
        $('#connectedMembers').hide();
     }
     else {
        $('#connectedMembers').show();
     }
});

