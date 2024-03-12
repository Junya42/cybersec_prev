"use client";
import React, { useEffect, useState, useRef } from "react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SiAcer } from "react-icons/si";
import { SiAmazon } from "react-icons/si";
import { SiAudi } from "react-icons/si";
import { SiCisco } from "react-icons/si";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { GoCommandPalette } from "react-icons/go";
import { GiDinosaurRex } from "react-icons/gi";
import { Si42 } from "react-icons/si";

function Title() {
  const words = [
    { text: "Cybersecurity", className: "text-white" },
    { text: " is ", className: "text-white" },
    { text: "Awesome", className: "text-indigo-300" },
  ];

  return (
    <div className="h-24 flex justify-center items-center rounded-md px-4 absolute z-20 top-20">
      <TypewriterEffect words={words} />
    </div>
  );
}

function TitleBrute() {
  const words = [
    { text: "But", className: "text-white" },
    { text: "internet", className: "text-white" },
    { text: " is ", className: "text-white" },
    { text: "Dangerous", className: "text-pink-700" },
  ];

  return (
    <div className="h-24 flex justify-center items-center rounded-md px-4">
      <TypewriterEffect words={words} />
    </div>
  );
}

interface BruteProps {
  account: string;
  password: string;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
}

function Brute({ account, password, setAccount }: BruteProps) {
  const chars = [
    "abcdefghijklmnopqrstuvwxyz",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "0123456789",
    "!@#$%^&*()_+",
  ].join("");
  const [acc, setAcc] = useState(account);
  const [passAttempt, setPassAttempt] = useState("");
  const [isCracking, setIsCracking] = useState(true);
  const maxDepth = password.length; // Définir la profondeur maximale de la tentative
  const isCrackingRef = useRef(isCracking);

  useEffect(() => {
    const crackPassword = async () => {
      for (let depth = 1; depth <= maxDepth; depth++) {
        if (!isCrackingRef.current) return;
        // Attendez que bruteForce termine pour chaque profondeur avant de passer à la suivante
        await bruteForce("", 0, depth);
      }
    };
    isCrackingRef.current = isCracking;
    if (isCrackingRef.current) crackPassword();
    else setPassAttempt(password);
  }, [isCracking]);

  useEffect(() => {
    if (passAttempt === password) {
      setIsCracking(false);
    }
  }, [passAttempt, password]);

  // Fonction pour introduire un délai
  const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

  const stopCracking = () => {
    setIsCracking(false);
  };

  const bruteForce = async (
    str: string,
    currentDepth: number,
    targetDepth: number
  ) => {
    if (!isCrackingRef.current) return;

    if (currentDepth === targetDepth) {
      setPassAttempt(str); // Mettre à jour l'état avec la tentative actuelle
      await delay(10); // Introduit un délai de 0.1 seconde
      return;
    }

    for (let i = 0; i < chars.length; i++) {
      if (!isCrackingRef.current) return;
      const nextStr = str + chars[i];
      // Continuer la récursion pour ajouter un autre caractère
      await bruteForce(nextStr, currentDepth + 1, targetDepth);
    }
  };

  return (
    <div className="h-screen relative w-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-700 to-indigo-300">
      <div className="shadow-3xl w-[90%] h-[85%] flex flex-col bg-gradient-to-br from-black/70 background-animate backdrop-blur-sm rounded-t-md relative justify-center items-center">
        <div className="h-[400%] w-full overflow-y-auto">
          <div className="h-full w-full">
            <TitleBrute />

            <div className="w-full flex justify-center gap-10">
              <div className="w-[300px] backdrop-blur-sm bg-gradient-to-br from-slate-500/10 to-slate-300/10 z-10 p-6 rounded-md flex flex-col justify-center items-center mb-4">
                <p className="text-center text-neutral-300 relative z-20">
                  Hacking {account}
                </p>

                <p className="mt-6 text-center text-gray-400 relative z-20">
                  BRUTE FORCE
                </p>
                <div className="bg-white w-full rounded-sm h-10 mt-4 flex justify-center items-center">
                  <p
                    className={`${
                      passAttempt === password
                        ? "text-emerald-400 animate-bounce"
                        : "text-black"
                    }`}
                  >
                    {passAttempt}
                  </p>
                </div>
                <Button onClick={stopCracking}>Accelerate hacking</Button>
              </div>
              <div className="w-2/3 backdrop-blur-sm bg-gradient-to-br from-slate-500/10 to-slate-300/10 z-10 p-6 rounded-md flex flex-col text-white justify-center items-center mb-4">
                <p>
                  Imaginez que vous avez un cadenas et une trousse pleine de
                  clés de toutes formes et tailles. Vous ne savez pas quelle clé
                  ouvre le cadenas, mais vous êtes déterminé à le déverrouiller.
                  Une attaque par force brute, c&apos;est un peu comme si vous
                  essayiez chaque clé, une par une, jusqu&apos;à ce que vous trouviez
                  celle qui ouvre le cadenas.
                  <br />
                  <br />
                  Dans le monde numérique, le &quot;cadenas&quot; est souvent un mot de
                  passe protégeant l&apos;accès à des informations ou des comptes en
                  ligne. L&apos;&quot;attaque par force brute&quot; est donc le processus qui
                  consiste à essayer systématiquement toutes les combinaisons
                  possibles de lettres, chiffres et symboles jusqu&apos;à trouver le
                  bon mot de passe.
                  <br />
                  <br />
                  Voici une façon simple de le visualiser :
                </p>
                <ol>
                  <li>
                    La trousse de clés : C&apos;est l&apos;ensemble des caractères
                    possibles que l&apos;on peut utiliser dans un mot de passe
                    (lettres majuscules et minuscules, chiffres, symboles).
                  </li>
                  <li>
                    Le processus d&apos;essai : Commencer par la combinaison la plus
                    simple (comme &quot;a&quot;) et continuer en augmentant la complexité
                    (passant à &quot;b&quot;, puis &quot;c&quot;, jusqu&apos;à arriver à des combinaisons
                    plus longues et complexes comme &quot;a1!B@&quot; et bien au-delà).
                  </li>
                  <li>
                    Trouver la bonne clé : Le processus continue jusqu&apos;à ce que
                    la bonne combinaison soit trouvée, ouvrant ainsi le
                    &quot;cadenas&quot; et donnant accès au compte ou à l&apos;information
                    protégée.
                  </li>
                </ol>
                <p>
                  Pourquoi est-il important d&apos;avoir un mot de passe complexe ?
                  Plus votre mot de passe est long et complexe (comme une clé
                  avec beaucoup de dents uniques), plus il y aura de &quot;clés&quot;
                  (combinaisons possibles) à essayer pour trouver la bonne. Cela
                  rend la tâche extrêmement difficile et longue pour quelqu&apos;un
                  tentant une attaque par force brute, décourageant ainsi les
                  tentatives ou les rendant pratiquement impossibles à réaliser
                  dans un laps de temps raisonnable.
                  <br />
                  <br />
                  En résumé, un mot de passe fort agit comme un cadenas très
                  sécurisé avec une clé très spécifique et complexe, rendant les
                  attaques par force brute inefficaces et protégeant vos
                  informations précieuses.
                </p>
                <br></br>
                <a target="_blank"
                  className="text-cyan-400 flex gap-2 justify-center items-center"
                  href="https://www.francenum.gouv.fr/magazine-du-numerique/combien-de-temps-un-pirate-met-il-pour-trouver-votre-mot-de-passe-comment"
                >
                  <GoCommandPalette /> Informations sur le brute force
                </a>
              </div>
            </div>
          </div>
          <div className="h-full w-full flex flex-col justify-center items-center gap-4">
            <h1 className="text-gray-400 text-2xl">SQL Injection</h1>
            <div className="h-4/5 w-3/5 bg-gradient-to-br from-black/70 to-slate-700/40 flex flex-col gap-4 px-8 justify-center items-center">
              <div className="w-full flex mt-4 gap-8 justify-center items-center text-black">
                <Input
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="w-1/3"
                  placeholder={account}
                />
                <Input
                  className="w-1/3"
                  placeholder="*********"
                  type="password"
                />
              </div>
              <p className="text-yellow-300 text-center">
                L&apos;objectif ici est de manipuler la condition ci-dessous pour se
                connecter.<br></br>
                <span className="text-yellow-300 text-center">
                  La condition signifie: &quot;Recuperer toutes les informations (*)
                  de l&apos;utilisateur dont le nom de compte est égale à
                  &apos;votre_nom_de_compte&apos; et le mot de passe est égale à
                  &apos;votre_mot_de_passe&apos;&quot;
                </span>
                <br></br>
              </p>
              <p className="text-center text-white">
                Connexion au compte:{" "}
                <span className="text-amber-400">
                  SELECT * FROM user where username = &apos;{account}
                  <span
                    className={
                      account.includes("'") && account.includes("--")
                        ? "text-gray-500"
                        : ""
                    }
                  >
                    &apos; and password = &apos;{password}&apos;
                  </span>
                </span>
              </p>
              <p className="text-center text-slate-400">
                Ce qu&apos;on remarque, c&apos;est que dans la condition de connexion
                <br></br>
                Le nom de compte se situe entre guillemet simple &quot; &apos; &quot;<br></br>
                Tout ce qui sera entre ces guillemets sera considéré comme un
                nom de compte<br></br>
                Et le mot de passe se situe aussi entre guillemet simple &quot; &apos; &quot;
                <br></br>
                Le reste (en dehors des guillemets) c&apos;est du code, qu&apos;on va
                pouvoir exploiter.<br></br>
                
                Vous pouvez chercher la solution par vous meme ou mettre votre
                souris sur le bouton ci-dessous pour voir la solution.<br></br>
              </p>
              <span className="text-center border p-2 group text-opacity-0 hover:text-opacity-100 hover:bg-transparent text-sky-300">
              Pour ce faire on va simplement tenter d&apos;effacer la condition de
                mot de passe en utilisant le caractère &quot; &apos; &quot; et le caractère
                &quot;--&quot; qui signifie &quot;commentaire&quot; en SQL.<br></br>
                On va donc tenter de se connecter avec le nom de compte suivant:{" "}
                <span className="text-amber-400 text-opacity-0 group-hover:text-opacity-100">
                  {acc}&apos;--
                </span>
              </span>
              <a target="_blank"
                className="text-cyan-400 flex gap-2 justify-center items-center"
                href="https://openclassrooms.com/fr/courses/7727176-realisez-un-test-dintrusion-web/7917166-attaquez-la-base-de-donnees-avec-les-injections-sql"
              >
                <GoCommandPalette /> Informations sur les injections SQL
              </a>
            </div>
          </div>
          <div className="h-full w-full flex flex-col justify-center items-center gap-4 px-12">
            <h1 className="text-gray-400 text-2xl">Plus d&apos;informations</h1>
            <p className="text-center text-gray-300">
              Il existe beaucoup trop de types d&apos;attaques et les exemples soumis
              ici reste suffisamment parlant pour vous sensibiliser a la
              cybersecurite
              <br />
              Voici donc une liste de liens pour en apprendre plus sur la
              cybersecurite
            </p>
            <div className="h-1/3 flex flex-col gap-12">
              <a target="_blank"
                className="text-cyan-400 flex gap-2 justify-center items-center"
                href="https://www.cisco.com/c/fr_ca/products/security/common-cyberattacks.html"
              >
                <GoCommandPalette /> Quelles sont les cyberattaques les plus
                courantes?
              </a>
              <a target="_blank"
                className="text-cyan-400 flex gap-2 justify-center items-center"
                href="https://www.economie.gouv.fr/particuliers/dix-regles-pour-vous-premunir-piratage-donnees"
              >
                <GoCommandPalette /> Dix règles pour vous prémunir contre le
                piratage de vos données personnelles
              </a>
              <a target="_blank"
                className="text-cyan-400 flex gap-2 justify-center items-center"
                href="https://www.youtube.com/watch?v=pQCT2ZnpHfY"
              >
                <GoCommandPalette /> Comment pirater un streamer grâce à son
                chat
              </a>
              <a target="_blank"
                className="text-cyan-400 flex gap-2 justify-center items-center"
                href="https://www.youtube.com/watch?v=m0FLBbdvThY"
              >
                <GoCommandPalette /> Comment une grosse entreprise gère une
                cyber-attaque
              </a>
            </div>
          </div>
          <div className="h-full w-full flex flex-col justify-center items-center gap-4 px-12">
            <h1 className="text-gray-400 text-2xl">Conclusion</h1>
            <p className="text-center text-gray-300">
              La cybersecurite est un domaine complexe et tres vaste, il est
              important de se sensibiliser a ce domaine pour eviter de se faire
              pirater ses donnees personnelles
              <br />
              Il est aussi important de se renseigner sur les differentes
              methodes de piratage pour pouvoir se proteger
              <br />
              <br />
              Merci d&apos;avoir participe a cette experience
            </p>
            <p className="group border text-center bg-slate-600 p-2 text-opacity-0 hover:text-opacity-100 text-sky-300">
              Bien evidemment, les &quot;sponsors&quot; situe en bas sont entierements
              faux, le but etait de vous poussez a entrer un nom de compte et
              mot de passe reel.<br></br>
              Pas de risque ici, vos donnees n&apos;ont pas ete enregistrees mais ca
              aurait pu etre le cas si vous etiez tombe sur un vrai site
              malveillant.<br></br>
              <br></br>
              De plus, en dehors des sites malveillants, il est important de se
              mefier des mails frauduleux, des sites de telechargement de
              logiciels et des reseaux wifi publics.<br></br>
              <br></br>
              <p className="text-center text-opacity-0 group-hover:text-opacity-100 text-pink-500">
                ATTENTION<br></br>
                IL EST BIEN EVIDEMMENT INTERDIT DE REPRODUIRE QUOI QUE CE SOIT
                QUE VOUS AVEZ VU ICI, IL S&apos;AGIT UNIQUEMENT D&apos;EXEMPLE POUR VOUS
                AIDER A COMPRENDRE LES ENJEUX DE LA CYBERSECURITE<br></br>
                IL ETAIT IMPORTANT DE COMPRENDRE COMMENT FONCTIONNE LES ATTAQUES
                POUR POUVOIR S&apos;EN DEFENDRE.<br></br>
              </p>
            </p>
            <p className="group border text-center bg-slate-600 p-2 text-opacity-0 hover:text-opacity-100 text-sky-300">
              PS: Bon courage pour votre soutenance de stage <GiDinosaurRex />
            </p>
          </div>
        </div>
      </div>
      <div className="w-[90%] h-[5%] rounded-b-md bg-black/90 flex items-center text-white gap-8">
        <h2 className="h-full px-4 flex items-center bg-black/50 text-white border-b-md">
          Sponsored by
        </h2>
        <div className="w-auto h-full flex gap-8 text-white text-3xl items-center">
          <Si42 />
          <SiAcer />
          <SiAmazon />
          <SiAudi />
          <SiCisco />
          <FaGoogle />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState(0);

  if (state === 1) {
    return (
      <Brute account={account} password={password} setAccount={setAccount} />
    );
  }
  return (
    <div className="h-screen relative w-full overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-slate-700 to-indigo-300">
      <div className="shadow-3xl w-[90%] h-[85%] flex flex-col bg-gradient-to-br from-black/70 background-animate backdrop-blur-sm rounded-t-md relative justify-center items-center">
        <Title />

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="backdrop-blur-sm bg-gradient-to-br from-slate-500/10 to-slate-300/10 z-10 p-6 rounded-md flex flex-col justify-center items-center"
        >
          <p className="text-center text-neutral-300 relative z-20">
            Create an account to get started.
          </p>
          <Input
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="mt-4"
            placeholder="Username"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-4"
            placeholder="Password"
            type="password"
          />
          <div className="w-full flex justify-center">
            <Button
              className="mt-4 w-1/2"
              variant="secondary"
              onClick={() => setState(1)}
            >
              Submit
            </Button>
          </div>
        </motion.div>
      </div>
      <div className="w-[90%] h-[5%] rounded-b-md bg-black/90 flex items-center text-white gap-8">
        <h2 className="h-full px-4 flex items-center bg-black/50 text-white border-b-md">
          Sponsored by
        </h2>
        <div className="w-auto h-full flex gap-8 text-white text-3xl items-center">
          <Si42 />
          <SiAcer />
          <SiAmazon />
          <SiAudi />
          <SiCisco />
          <FaGoogle />
        </div>
      </div>
    </div>
  );
}
