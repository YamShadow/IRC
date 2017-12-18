  <main class="window">
      <div class="bar">
          <div class="btn"></div>
          <i title="Paramètres" class="fa fa-cog" aria-hidden="true"></i>
      </div>
      <div class="body">
          <pre>
              <aside id="salonsList">
                  <h2 class="comment">#Salons :</h2>
                  <h3 class="custom">$ <span class="greenColor">add array Salons</span></h3>

                  <vue-salon ref="foo"></vue-salon>

                  <button class="btn-shell addSalon">Ajouter un salon</button>
              </aside>

              <object data="http://localhost:3000?pseudo=<?= $_SESSION['user_pseudo'] ?>&salon=room" width="1000" height="1000">
                  <p>Le serveur Node n'est pas lancé !</p>
              </object>

              <aside id="connectedMembers">
              <h2 class="comment">#Connectés :</h2>
              <h3 class="custom">$ <span class="greenColor">echo each Members</span></h3>
                  <ul>
                      <li v-for="member in members" :id="member.id" :pseudo="member.pseudo" :avatar="member.avatar">{{ member.pseudo }}</li>
                  </ul>
              </aside>
          </pre>
      </div>
  </main>
  <div class="filter">
</div>

<div id="modalAddSalon" class="modal">
    <div class="window">
        <div class="bar">
            <div class="btn">
              <span class="closeModal">x</span>
            </div>
        </div>
        <div class="body">
            <pre>
                $ <span class="greenColor" data-typer="add input newSalon"></span>
                <input class="pulse input-shell" id="inputNewSalon" type="text" v-model="name" />
                <p class="errorMessage">Le salon doit avoir un nom !</p>
                <button class="btn-shell" id="addNewSalon">Ajouter</button>
            </pre>
        </div>
    </div>
</div>

<div id="modalParameters" class="modal">
    <div class="window">
        <div class="bar">
            <div class="btn">
              <span class="closeModal">x</span>
            </div>
        </div>
        <div class="body">
            <pre>
                <h2 class="comment">#Modifier les paramètres de l'utilisateur :</h2>
                <div class="prompt">$ <span class="command">add input update Login</span></div>
                <div class="prompt">Update Login</div>
                <div class="prompt">$ <input type="text" name="login" id="login" class="pulse input-shell" required></div>
                <div class="prompt">$ <span class="command">add input update password</span></div>
                <div class="prompt">Update Password</div>
                <div class="prompt">$ <input type="password" name="mdp" id="mdp" class="pulse input-shell" required></div>
                <div class="prompt">$ <span class="command">add input update confirmPassword</span></div>
                <div class="prompt">Update Confirm Password</div>
                <div class="prompt">$ <input type="password" name="confirmMdp" id="confirmMdp" class="pulse input-shell" required></div>
                <div class="prompt">$ <span class="command">add input update image</span></div>
                <div class="prompt">Update Url Avatar</div>
                <div class="prompt">$ <input type="text" name="image" id="image" class="pulse input-shell" ></div>
                <div><button type="submit" class="btn-shell">Valider les changements</button></div>
            </pre>
        </div>
    </div>
</div>

<div id="modalUsers" class="modal">
  <div class="window">
    <div class="bar">
      <div class="btn">
        <span class="closeModal">x</span>
      </div>
    </div>
    <div class="body">
      <pre>
        Profil de <span data-id="" class="profilPseudo"></span>
        <img class="profilAvatar" src="" alt="" />
      </pre>
    </div>
  </div>
</div>
