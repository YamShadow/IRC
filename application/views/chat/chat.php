<?php

// var_dump($_SESSION);

?>

<main class="window">
    <div class="bar">
        <div class="btn"></div>
    </div>
    <div class="body">
        <pre>
            <aside id="salonsList">
                <h2 class="comment">#Salons :</h2>
                <h3 class="custom">$ <span class="greenColor">add array Salons</span></h3>
                <ul>
                    <li v-for="salon in salons">{{ salon.text }}</li>
                </ul>
                
                <button class="btn-shell addSalon">Ajouter un salon</button>
            </aside>

            <object data="http://localhost:3000?pseudo=<?= $_SESSION['user_pseudo'] ?>" width="1000" height="1000">
                <p>Le serveur Node n'est pas lancé !</p>
            </object>

            <aside id="connectedMembers">
            <h2 class="comment">#Connectés :</h2>
                <ul>
                    <li v-for="member in members">{{ member.text }}</li>
                </ul>
            </aside>
        </pre>
    </div>
</main>

<div id="modalAddSalon">
    <div class="window">
        <div class="bar">
            <div class="btn"></div>
        </div>
        <div class="body">
            <pre>
                <span data-typer="$ add input newSalon"></span>
                <input class="pulse input-shell" type="text" v-model="name" />
                <button class="btn-shell" v-on:click="addSalon">Ajouter</button>
            </pre>
        </div>
    </div>
    
</div>