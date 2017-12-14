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
                <input class="pulse input-shell" type="text" v-model="name" />
                <button class="btn-shell" v-on:click="addSalon">Ajouter un salon</button>
            </aside>

            <aside id="connectedMembers">
            <h2 class="comment">#Connectés :</h2>
                <ul>
                    <li v-for="member in members">{{ member.text }}</li>
                </ul>
            </aside>
        </pre>
    </div>
</main>