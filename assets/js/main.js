$(document).ready(function() {


    let idSalon = '';

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
                        if(salons[salon].nom == $_GET("room")) {
                            idSalon = salons[salon].id;
                        }
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


    // Users connected
    
    var listMembers = new Vue({
        el: '#connectedMembers',
        data: {
            members: [],
        },
        created () {
            this.buildMembers();
            this.timer = setInterval(this.buildMembers, 3000)
        },
        methods: {
            buildMembers: function() {
                var self = this
                $.ajax({
                    method: 'POST',
                    url: 'ajax.php?action=usersInSalon',
                    data: {
                        salon_id: idSalon
                    }
                }).done(function (data) {
                    self.members = data;
                });
            }
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

    function $_GET(param) {
        let vars = {}
        window.location.href.replace( location.hash, '' ).replace( 
            /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
            function( m, key, value ) { // callback
                vars[key] = value !== undefined ? value : ''
            }
        );

        if (param) {
            return vars[param] ? vars[param] : 'General'	
        }
        return vars
    }

    $('#updateUser').on('click', function() {
        let login = $('#login').val();
        let mail = $('#mail').val();
        let avatar = $('#image').val();
        let mdp = $('#mdp').val();
        let confirmMdp = $('#confirmPseudo').val();
        $.ajax({
            method: 'POST',
            url: 'ajax.php?action=updateUser',
            data: {
                login: login,
                user_id: idUser,
                mdp: mdp,
                confirmMdp: confirmMdp,
                mail: mail,
                image: avatar
            }
        }).done(function (data) {
            $('.modalSuccess').show();
            $('.modalSuccess').html('Vos données ont bien été mises à jour');
            setTimeout(function() { $(".modalSuccess").hide(); }, 2000);
            $('#modalParameters').hide();
            $('.filter').hide();
        });
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

