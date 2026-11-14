import { IChapter } from "../models/Game";

export const chapters: IChapter[] = [
  {
    chapterName: 'Text',
    levels: [
      {
        levelName: 'font-size',
        instructions: 'Let\'s help the tiny paragraph over there to grow up! <code>Font-size</code> is the magic potion you need.',
        beforeCode: '.misprint {',
        afterCode: '}',
        linesOfCode: 1,
        startHighlightCode: 2,
        error: 'font-size: 12px;',
        solutions: [['font-size', '16px', '1em', '1rem']],
        tipSelector: 'p',
        tipInfo: 'The paragraph\'s characters are <strong>16px</strong> in size',
        articleContent: `
          <h2>Unmasking Zmeii and their tales of abducted maidens</h2>
          <article>
            <img src="img/creatures/zmeu.jpg" alt="Zmeu" />
            <p>Deep within the Carpathian Mountains reside the elusive Zmeii, mythical creatures often mistaken for dragons or balauri. They possess a mix of human-like and supernatural traits that make them distinct from other legendary beings, even though they share some similarities with dragons. The term "zmeu" has Slavic roots and is associated with enchantment and curses.</p>
            <p>Zmeii are known for their enormous physical strength and are often depicted wielding magical weapons like large clubs and enchanted whips. They live in grand castles made from precious materials and showcase impressive craftsmanship and advanced technology.</p>
            <p class="misprint">Within their society, Zmeii have family structures that include mothers, siblings, and sometimes even children. In the wild, their stories often involve the abduction of human girls, leading to confrontations with resourceful heroes who rely on clever strategies and help from other mythical creatures to rescue the captives.</p>
          </article>
        `
      },
      {
        levelName: 'font-style',
        instructions: 'The second quote doesn\'t look as stylish as the first one, does it? <code>Font-style</code> will come to give you a hand!',
        beforeCode: '.misprint {',
        afterCode: '}',
        linesOfCode: 1,
        startHighlightCode: 2,
        error: 'font-style: normal;',
        solutions: [['font-style', 'italic']],
        tipSelector: 'q',
        tipInfo: 'This quote\'s style is <strong>italic</strong>',
        articleContent: `
          <h2>The Majestic Appearance of Zmeii</h2>
          <article>
          <img src="https://dummyimage.com/347x150/d7d2c5/000.jpg" alt="Image" />
            <p>One common portrayal describes Zmeii as colossal, serpent-like creatures, often with reptilian features. These beings are known for their immense physical strength, a fact emphasized in folklore. They are described as having imposing, larger-than-life forms, comparable to mountains, and possessing thick, scaly skin reminiscent of a snake's. As one folkloric account highlights:</p>
            <q>Their aspect is intimidating, their presence akin to a looming mountain.</q>
            <p>Another distinctive feature often attributed to Zmeii is their formidable wings. These wings are said to be vast, granting them the ability to soar through the skies with ease. They are sometimes compared to the wings of eagles or other mighty birds of prey. As the tales recount:</p>
            <q class="misprint">Their wings span wide like the horizon itself, allowing them to command the heavens.</q>
            <p>Despite their fearsome appearance, Zmeii are not mere brutes; they are complex beings with human-like characteristics. They are often depicted with humanoid faces, expressing a range of emotions. As one narrative elucidates:</p>
            <q>Their faces reflect a strange blend of human-like expression, at times revealing sadness, anger, or even curiosity.</q>
          </article>
        `
      },
      {
        levelName: 'font-family',
        instructions: 'There is a paragraph that seems to belong to a different story. Let\'s rectify this by using <code>font-family</code> property!<br/> <br/>Please note that font-family specifies the font and its fallbacks, separated by commas.',
        beforeCode: '.misprint {',
        afterCode: '}',
        linesOfCode: 1,
        startHighlightCode: 2,
        error: 'font-family: "Turret Road";',
        solutions: [['font-family', 'Crimson Text', '"Crimson Text"']],
        tipSelector: 'p',
        tipInfo: 'This paragraph it is part of <strong>"Crimson Text"</strong> family',
        articleContent: `
          <h2>Ancient Beliefs</h2>
          <article>
            <p>Zmeii they have the amazing ability to hide either their moisture or soul in certain parts of their body, in other animals or objects, making them even harder to kill.</p>
            <p>This is a matter that stems from an ancient primitive mentality, in which it was believed that humans also have their vital principle in a certain point of the body, such as the fat around the kidneys, for example. And if someone stole this fat, they could permanently harm the person.</p>
            <img src="https://dummyimage.com/347x150/d7d2c5/000.jpg" alt="Image" />
            <p class="misprint">The problem with dragons, however, was that they could avoid this weakness by moving their vulnerability. In “Povestea țărănească,” it is revealed that a dragon kept its power in a sow, which was more complicated because there was a rabbit in the sow, a quail in the rabbit, and three worms in the quail.</p>
            <img src="https://dummyimage.com/347x150/d7d2c5/000.jpg" alt="Image" />
            <p>This is the typology, if you will, of this magic of protecting vitality in general, carefully hidden in three animals, each one placed inside the other like a true matryoshka doll.</p>
          </article>
        `
      },
      {
        levelName: 'font-size, font-style, font-family,',
        instructions: 'Doesn\'t the second quote look strange? Use all the font properties you learned so far (<code>font-family</code>, <code>font-size</code>, <code>font-style</code>) to adjust it!',
        beforeCode: '.misprint {',
        afterCode: '}',
        linesOfCode: 3,
        startHighlightCode: 2,
        error: 'font-size: 10px; font-style: normal; font-family: Source Code Pro;',
        solutions: [['font-size', '16px', '1em', '1rem'], ['font-style', 'italic'], ['font-family', 'Playfair Display', '"Playfair Display"']],
        tipSelector: 'q',
        tipInfo: 'This quote\'s characters are <strong>16px</strong> in size, styled in <strong>italic</strong>, and belong to the <strong>"Playfair Display"</strong> family.',
        articleContent: `
          <h2>To dumb to be true</h2>
          <article>
            <p>The Zmeii, in all aspects, appear to be formidable creatures, if not outright impossible to defeat. This is attributed not only to their imposing physicality but also to their magical weapons and various supernatural powers. However, despite their fierce appearance, there is an important aspect to know, as every hero in every tale discovers: they are quite gullible and easily fooled.</p>
            <img src="https://dummyimage.com/347x140/d7d2c5/000.jpg" alt="Image" />
            <p>Reading from a story, the Zmeu is described as dull as midnight:</p>
            <q>Their adaptation, much like inferior animals, is one-sided and lacking in imagination.</q>
            <p>The same story continues:</p>
            <q class="misprint">When someone discovers their weaknesses, they cannot invent anything to counter aggression. That's why they are in a perpetual fear of encountering notorious heroes.</q>
            <img src="https://dummyimage.com/347x100/d7d2c5/000.jpg" alt="Image" />

            <p>The Zmeu is often disoriented, impulsive, and chaotic, large but clumsy, lacking agility, and above all, fearful. Some are so terrified that their hands and feet practically move on their own when they see a brave hero, as depicted in "Făt Frumos cu carâta de sticlă" They are easily beheaded because they charge into battle like boulders, without tact or minimal strategy; they are, in fact, highly credulous.</p>
          </article>
        `
      },
      {
        levelName: 'font-weight',
        instructions: 'Why is that subtitle thinner than the other one? This should be a mistake! Use <code>font-weight</code> property to adjust it!',
        beforeCode: '.misprint {',
        afterCode: '}',
        linesOfCode: 1,
        startHighlightCode: 2,
        error: 'font-weight: 100;',
        solutions: [['font-weight', 'bold']],
        tipSelector: 'h3',
        tipInfo: 'This subtitle is <strong>bold</strong>',
        articleContent: `
          <h2>Unraveling the Enchanted Whips of the Zmeii</h2>
          <article>
            <h3>Introduction to the Magical Arsenal</h3>
            <p>In the rich tapestry of Carpathian folklore, the Zmeii, mythical beings of overwhelming power, are known for more than just their colossal clubs. They possess another formidable weapon, often concealed in the depths of their chambers - the enchanted whip.</p>
            <img src="https://dummyimage.com/347x190/d7d2c5/000.jpg" alt="Image" />
            <p>These whips, imbued with magic, harbor countless powers. They can shrink grand palaces to fit in the palm of a hand, as seen in the tale of "Prâslea cel voinic si merele de aur", where striking the whip at the four corners of a palace transforms it into apples made of copper, silver, and gold.</p>
            <h3 class="misprint">The Mysterious Powers of the Whip</h3>
            <p>In the "Poveste tărănească" the Zmeu keeps other whips, with one reducing herds to the size of a walnut and another shrinking estates to the size of an apple. In "Cei trei frați și Zmeul" the whip opens any door, turns houses into golden apples, or assists the Zmeu in transforming into terrifying creatures with a somersault three times and a whip crack. However, its primary and frequently encountered power is the ability to turn anyone or anything into stone with a single strike, typically executed from behind the adversary, and conversely, to bring to life anyone who has been enchanted, by cracking it three times in front of them.</p>
          </article>
        `
      },
      {
        levelName: 'color',
        instructions: 'That red paragraph is really standing out for no reason. Let\'s display it properly via <code>color</code> property!',
        beforeCode: '.misprint {',
        afterCode: '}',
        linesOfCode: 1,
        startHighlightCode: 2,
        error: 'color: red;',
        solutions: [['color', 'black', '#000000', '#000', 'rgb(0,0,0)', 'rgba(0,0,0,1)']],
        tipSelector: 'p',
        tipInfo: 'This paragraph\'s color is <strong>black</strong>',
        articleContent: `
          <h2>Buzdugan: The Unstoppable Weapon</h2>
          <article>
            <p>The "buzdugan" is an iconic and imposing weapon featured prominently in Carpathian tales. This massive club serves as a symbol of immense physical strength and power. The term "buzdugan" itself conjures images of a weapon that can shatter the earth and subdue even the most formidable adversaries.</p>
            <p>Zmeii are often depicted wielding buzdugans of immense proportions, with some weighing as much as 50 "feri," an archaic unit of measurement roughly equivalent to 10 liters. This extraordinary weight underscores the sheer might of these legendary creatures.</p>
            <img src="https://dummyimage.com/347x173/d7d2c5/000.jpg" alt="Image" />
            <p class="misprint">When a Zmeu wields a buzdugan, it becomes a force to be reckoned with. The impact of this colossal club can bring down trees, disrupt landscapes, and devastate opponents in battle. It is a testament to the Zmeu's dominance in physical combat and their role as formidable adversaries in Romanian folklore narratives.</p>
            <img src="https://dummyimage.com/347x173/d7d2c5/000.jpg" alt="Image" />
            <p>The buzdugan is not just a weapon; it is a symbol of the Zmeii's unparalleled strength, an emblem of their mythological prowess, and a key element in the captivating tales that continue to enchant audiences with their epic battles and timeless themes.</p>
          </article>
        `
      },
      {
        levelName: 'font-weight, color',
        instructions: 'The second subtitle of the article is red and thinner than the first one which doesn\'t make much sense. You can use <code>font-weight</code> and <code>color</code> properties to correct this!',
        beforeCode: '.misprint {',
        afterCode: '}',
        linesOfCode: 2,
        startHighlightCode: 2,
        error: 'font-weight: 100; color: red;',
        solutions: [['font-weight', 'bold'], ['color', 'black', '#000000', '#000', 'rgb(0,0,0)', 'rgba(0,0,0,1)']],
        tipSelector: 'h3',
        tipInfo: 'This subtitle is <strong>bold</strong> and its color is <strong>black</strong>',
        articleContent: `
          <h2>Culinary Exploits Beyond Imagination</h2>
          <article>
            <h3>A Herculean Appetite</h3>
            <p>The Zmeu, endowed with unparalleled strength, demonstrates astonishing feats like uprooting trees, carrying horses effortlessly, and juggling sacks of gold. Their colossal size is exemplified in tales such as "Agheran Viteazul," where a hero prepares an extravagant feast, simultaneously cooking 999 wild oxen and numerous boars in four giant pots.</p>
            <img src="https://dummyimage.com/347x140/d7d2c5/000.jpg" alt="Image" />
            
            <p>In their culinary pursuits, Zmeii savor a diverse array of dishes—from succulent roasts of pork, lamb, or goose to the simplicity of bread and cheese, often complemented by water or wine. However, the true delicacy for these mythical beings lies in the consumption of human flesh and blood.</p>
            <h3 class="misprint">Anthropophagy Unveiled</h3>
            <p>Discovering their anthropophagic tendencies, as revealed in "Urmă Galbenă și Pipăruș Pătru," where the elder Zmeu, Mamonul, casually partakes in a meal with a pipe in hand, occasionally indulging in sips of human blood from a sizable bottle. Despite the enticing aroma of Zmeu cuisine, it is intertwined, much like their wine, with the essence of human blood.</p>
          </article>
        `
      },
      {
        levelName: 'font-size, font-style, font-family, font-weight, color',
        instructions: 'Ouch! Look at the paragraph that stands out! Use all the font properties you learned so far (<code>font-size</code>, <code>font-family</code>, <code>font-style</code>, <code>font-weight</code>, <code>color</code>) to make it appear as expected.',
        beforeCode: '.misprint {',
        afterCode: '}',
        linesOfCode: 5,
        startHighlightCode: 2,
        error: 'font-size: 20px; font-family: "Turret Road"; font-style: italic; font-weight: 800; color: blue;',
        solutions: [['font-size', '16px', '1em', '1rem'], ['font-family', 'Crimson Text', '"Crimson Text"'], ['font-style', 'normal'], ['font-weight', 'normal'], ['color', 'black', '#000000', '#000', 'rgb(0,0,0)', 'rgba(0,0,0,1)']],
        tipSelector: 'p',
        tipInfo: 'This paragraph\'s characters are <strong>16px</strong> in size, styled in <strong>normal</strong>, belong to the <strong>"Crimson Text"</strong> family, are <strong>normal</strong> in weight, and are colored <strong>black</strong>',
        articleContent: `
          <h2>The Extravagant Realms of the Zmeu</h2>
          <article>
            <img src="https://dummyimage.com/347x100/d7d2c5/000.jpg" alt="level" />
            <p>The Zmeu inhabits opulent castles that surpass the technological and architectural sophistication of our own. These structures, crafted from glass, bronze, silver, or even gold, boast intricate mechanisms, including heliotropic devices that enable them to pivot with the sun. Resembling vast noble estates, these palaces are surrounded by splendid gardens, fountains, orchards, and hunting forests, establishing a complete feudal domain.</p>
            
            <p class="misprint">Much like us, the Zmeu is a social being, living within family structures complete with mothers, siblings, and sometimes children, frequently daughters. In some rare instances, human and Zmeu kinship is not unheard of, as illustrated in the fairy tale "Spaima zmeilor," where an emperor, after nine years of epic battles with the bravest Zmeu, Pârjol, ultimately marries his sister.</p>
            <img src="https://dummyimage.com/347x150/d7d2c5/000.jpg" alt="level" />
          </article>
        `
      },
      {
        levelName: 'text-align',
        instructions: 'What is the purpose of that paragraph aligned to the right? None at all! Let\'s correct it by utilizing the <code>text-align</code> property!',
        beforeCode: '.misprint {',
        afterCode: '}',
        linesOfCode: 1,
        startHighlightCode: 2,
        error: 'text-align: right;',
        solutions: [['text-align', 'left']],
        tipSelector: 'p',
        tipInfo: 'This paragraph is aligned to the <strong>left</strong>',
        articleContent: `
          <h2>Unveiling the Formidable Zmeoaice - Masters of Fury</h2>
          <article>
            <img src="https://dummyimage.com/347x100/d7d2c5/000.jpg" alt="level" />
            <p>In the captivating realm of the Carpathian Mountains, Zmeoaice, the female counterparts of the mythical Zmeii, emerge as powerful and ferocious beings. Often depicted with a jaw reaching the sky and emitting flames like an oven, these formidable creatures possess unique abilities, typically associated with the feminine aspects of the mythos. To evade their wrath, valiant heroes resort to enchanted objects, such as tiles that transform into mountains of stone, thrown combs that morph into vast and dense forests, or rings from which walls of flint rise to the heavens. Defeating a mighty Zmeoaica is a close shave, with heroes barely escaping the edge of the blade.</p>

            <p class="misprint">Known for their fiery temperament, especially the mother of the Zmeii, these female entities display a spirited and irritable nature, reminiscent of an elderly woman. With a fervent love for their offspring, particularly their sons, Zmeoaice wield colossal powers, flying through the air disguised as natural phenomena, scaling mountains, sipping on enemies, and turning them to stone. Their fierce behavior extends to stone piercing, tree-eating, and a literal explosion of anger when provoked.</p>
            <img src="https://dummyimage.com/347x175/d7d2c5/000.jpg" alt="level" />
          </article>
        `
      },
      {
        levelName: 'line-height',
        instructions: 'Isn\'t the quote on the right harder to read compared to the other one? That\'s due to the small spacing between the lines. Let\'s enhance its accessibility by adjusting the <code>line-height</code> property!',
        beforeCode: '.misprint {',
        afterCode: '}',
        linesOfCode: 1,
        startHighlightCode: 2,
        error: 'line-height: 0.6em',
        solutions: [['line-height', '20px', '1.25em', '1.25rem']],
        tipSelector: 'q',
        tipInfo: 'This quote\'s line height is <strong>20px</strong>',
        articleContent: `
          <h2>Mother of Zmeii</h2>
          <article>
            <q>You scoundrel, rascal, and fool, with less wit than a goose</q>
            <p>These stern words reverberate through the realms of Carpathian Mountains, spoken by the fearsome mother of the Zmeii. With a sharp corner capable of perforating stone and consuming trees, her wrath is a force to be reckoned with.</p>
            <img src="https://dummyimage.com/347x190/d7d2c5/000.jpg" alt="level" />
            <p>The mother of the Zmeii is a complex and formidable character. Portrayed as a choleric, irascible figure with shades of a cantankerous old woman, the mother Zmeu is characterized by her deep love for her children, especially when arranging marriages and seeking vengeance for their untimely demise. Possessing colossal powers, she soars through the air, ascends mountains, devours foes, and petrifies them with a mere glance.</p>
            <p>The second time the Zmeu is defeated by the brave hero, he cries in fear, saying:</p>
            <q class="misprint">Because his mother would beat with a cudgel when she got angry</q> 
            <p>to beat someone with a cudgel meaning to thrash them soundly.</p>
          </article>
        `
      },
      {
        levelName: 'text-align, line-height',
        instructions: 'Oh, oh! The second subtitle looks really broken! You can fix it by applying the last two CSS properties you just learned: <code>text-align</code> and <code>line-height</code>.',
        beforeCode: '.misprint {',
        afterCode: '}',
        linesOfCode: 2,
        startHighlightCode: 2,
        error: 'text-align: center; line-height: 5.5em;',
        solutions: [['text-align', 'left'], ['line-height', '1.15em', '1.15rem', '18.4px']],
        tipSelector: 'h3',
        tipInfo: 'This subtitle is aligned to the <strong>left</strong> and has a line height of <strong>1.15em</strong>',
        articleContent: `
          <h2>Insert your article title here</h2>
          <article>
            <p>Fusce lobortis ante eget finibus bibendum. Donec mauris purus, volutpat eget eros in, vestibulum ulamcorper. Alala bala portocala Fusce lobortis ante eget finibus bibendum. Donec mauris purus, volutpat eget eros in, vestibulum ullamcorper ipsum. Sed pretium metus ac odio pellentesque, sed convallis ante molestie. Praesent sagittis venenatis diam, eu condimentum ipsum hendrerit id. Morbi at massa eu dolor convallis feugiat.</p>
            <h3>First article subtitle</h3>
            <p>Dolor sit amet consectetur adipisicing elit. Nihil id corrupti neque praesentium blanditiis suscipit nostrum assumenda maxime aperiam quos voluptas voluptates minus, labore nesciunt? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi asa voluptates minus sollicitudin a diam eget. Sed pretium metus ac odio pellentesque non mollis lorem volutpat eget eros in amet consectetur sollicitudin a diam. Fusce lobortis ante eget finibus bibendum. Donec mauris purus, etc. Aliquam est est, sollicitudin a diam eget dacia est.</p>
            <h3 class="misprint">First article subtitle</h3>
            <p>Fusce tincidunt risus eget magna pretium placerat. Maecenas et tempus mauris. Aliquam est est, sollicitudin a diam eget, maximus pretium lectu. Dolor sit amet consectetur adipisicing elit. Nihil id corrupti neque praesentium blanditiis suscipit nostrum assumenda maxime aperiam quos voluptas voluptates minus, labore nesciunt?</p>
            <img src="https://dummyimage.com/347x100/d7d2c5/000.jpg" alt="level" />
          </article>
        `
      },
      {
        levelName: 'text-decoration',
        instructions: 'The <code>Text-decoration</code> property will help you remove the underline of the second subtitle in this article.',
        beforeCode: '.misprint {',
        afterCode: '}',
        linesOfCode: 1,
        startHighlightCode: 2,
        error: 'text-decoration: underline;',
        solutions: [['text-decoration', 'none']],
        tipSelector: 'h3',
        tipInfo: 'This Subtitle is <strong>not underlined</strong>',
        articleContent: `
          <h2>Insert your article title here</h2>
          <article>
            <p>Fusce lobortis ante eget finibus bibendum. Donec mauris purus, volutpat eget eros in, vestibulum ulamcorper. Alala bala portocala Fusce lobortis ante eget finibus bibendum. Donec mauris purus, volutpat eget eros in, vestibulum ullamcorper ipsum. Sed pretium metus ac odio pellentesque, sed convallis ante molestie. Praesent sagittis venenatis diam, eu condimentum ipsum hendrerit id. Morbi at massa eu dolor convallis feugiat.</p>
            <h3>First article subtitle</h3>
            <p>Dolor sit amet consectetur adipisicing elit. Nihil id corrupti neque praesentium blanditiis suscipit nostrum assumenda maxime aperiam quos voluptas voluptates minus, labore nesciunt? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi asa voluptates minus sollicitudin a diam eget. Sed pretium metus ac odio pellentesque non mollis lorem volutpat eget eros in amet consectetur sollicitudin a diam. Fusce lobortis ante eget finibus bibendum.</p>
            <img src="https://dummyimage.com/347x100/d7d2c5/000.jpg" alt="level" />
            <h3 class="misprint">First article subtitle</h3>
            <p>Fusce tincidunt risus eget magna pretium placerat. Maecenas et tempus mauris. Aliquam est est, sollicitudin a diam eget, maximus pretium lectu. Dolor sit amet consectetur adipisicing elit. Nihil id corrupti neque praesentium blanditiis suscipit nostrum assumenda maxime aperiam quos voluptas voluptates minus, labore nesciunt?</p>
            <p>Fusce tincidunt risus eget magna pretium placerat. Maecenas et tempus mauris. Aliquam est est, sollicitudin a diam eget, maximus pretium lectu.</p>
          </article>
        `
      },
      {
        levelName: 'text-transform',
        instructions: 'At times, we may desire to alter the capitalization of the text. Let\'s use the <code>text-transform</code> property to capitalize the second article\'s subtitle!',
        beforeCode: '.misprint {',
        afterCode: '}',
        linesOfCode: 1,
        startHighlightCode: 2,
        error: 'text-transform: uppercase;',
        solutions: [['text-transform', 'capitalize']],
        tipSelector: 'h3',
        tipInfo: 'This subtitle is <strong>capitalized</strong>',
        articleContent: `
          <h2>Insert your article title here</h2>
          <article>
            <p>Fusce lobortis ante eget finibus bibendum. Donec mauris purus, volutpat eget eros in, vestibulum ulamcorper. Alala bala portocala Fusce lobortis ante eget finibus bibendum. Donec mauris purus, volutpat eget eros in.</p>
            <img src="https://dummyimage.com/347x100/d7d2c5/000.jpg" alt="level" />
            <h3>Loremipsum</h3>
            <p>Dolor sit amet consectetur adipisicing elit. Nihil id corrupti neque praesentium blanditiis suscipit nostrum assumenda maxime aperiam quos voluptas voluptates minus, labore nesciunt? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi asa voluptates minus sollicitudin a diam eget. Sed pretium metus ac odio pellentesque non mollis lorem volutpat eget eros in amet consectetur sollicitudin a diam. Fusce lobortis ante eget finibus bibendum. Donec mauris purus, etc. Aliquam est est, sollicitudin a diam eget dacia est.</p>
            <h3 class="misprint">Morelorem</h3>
            <p>Fusce tincidunt risus eget magna pretium placerat. Maecenas et tempus mauris. Aliquam est est, sollicitudin a diam eget, maximus pretium lectu. Dolor sit amet consectetur adipisicing elit. Nihil id corrupti neque praesentium blanditiis suscipit nostrum assumenda maxime aperiam quos voluptas voluptates minus, labore nesciunt?</p>
            <p>Fusce tincidunt risus eget magna pretium placerat. Maecenas et tempus mauris. Aliquam est est, sollicitudin a diam eget, maximus pretium lectu.</p>
          </article>
        `
      },
      {
        levelName: 'text-decoration, text-transform',
        instructions: 'Take a look at the subtitle in the second column! It is intended to denote a new section, but unfortunately, it is in all uppercase and truncated with a line. Let\'s fix it using the two properties we just learned: <code>text-decoration</code> and <code>text-transform</code>!',
        beforeCode: '.misprint {',
        afterCode: '}',
        linesOfCode: 2,
        startHighlightCode: 2,
        error: 'text-decoration: line-through; text-transform: uppercase;',
        solutions: [['text-decoration', 'none'], ['text-transform', 'none']],
        tipSelector: 'h3',
        tipInfo: 'This subtitle is <strong>not overlined</strong> and is <strong>not uppercased</strong>',
        articleContent: `
          <h2>Insert your article title here</h2>
          <article>
            <p>Fusce lobortis ante eget finibus bibendum. Donec mauris purus, volutpat eget eros in, vestibulum ulamcorper. Alala bala portocala Fusce lobortis ante eget finibus bibendum. Donec mauris purus, volutpat eget eros in, vestibulum ullamcorper ipsum. Sed pretium metus ac odio pellentesque, sed convallis ante molestie. Praesent sagittis venenatis diam, eu condimentum ipsum hendrerit id. Morbi at massa eu dolor convallis feugiat.</p>
            <h3>Loremipsum</h3>
            <p>Dolor sit amet consectetur adipisicing elit. Nihil id corrupti neque praesentium blanditiis suscipit nostrum assumenda maxime aperiam quos voluptas voluptates minus, labore nesciunt? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi asa voluptates minus sollicitudin a diam eget. Sed pretium metus ac odio pellentesque non mollis lorem volutpat eget eros in amet consectetur sollicitudin a diam. Fusce lobortis ante eget finibus bibendum. Donec mauris purus, etc. Aliquam est est, sollicitudin a diam eget dacia est.</p>
            <h3 class="misprint">Morelorem</h3>
            <p>Fusce tincidunt risus eget magna pretium placerat. Maecenas et tempus mauris. Aliquam est est, sollicitudin a diam eget, maximus pretium lectu. Dolor sit amet consectetur adipisicing elit. Nihil id corrupti neque praesentium blanditiis suscipit nostrum assumenda maxime aperiam quos voluptas voluptates minus, labore nesciunt?</p>
            <img src="https://dummyimage.com/347x100/d7d2c5/000.jpg" alt="level" />
          </article>
        `
      },
      {
        levelName: 'line-height, text-align, text-decoration, text-transform',
        instructions: 'Doesn\'t the second quote look quite unappealing? Let\'s use the first quote as a model and apply the appropriate values for the <code>line-height</code>, <code>text-align</code>, <code>text-decoration</code> and <code>text-transform</code> properties to improve its appearance.',
        beforeCode: '.misprint {',
        afterCode: '}',
        linesOfCode: 4,
        startHighlightCode: 2,
        error: 'line-height: 3em; text-align: right; text-decoration: underline; text-transform: uppercase;',
        solutions: [['line-height', '20px', '1.25em', '1.25rem'], ['text-align', 'left'], ['text-decoration', 'none'], ['text-transform', 'none']],
        tipSelector: 'q',
        tipInfo: 'This quote\'s line height is <strong>20px</strong>, it is aligned to the <strong>left</strong>, it is <strong>not underlined</strong>, and it is <strong>not uppercased</strong>',
        articleContent: `
          <h2>Insert your article title here</h2>
          <article>
            <p>Fusce lobortis ante eget finibus bibendum. Donec mauris purus, volutpat eget eros in, vestibulum ullamcorper. Alala bala portocala Fusce lobortis ante eget finibus bibendum. Donec mauris purus, volutpat eget eros in, vestibulum ullamcorper ipsum. Sed pretium metus ac odio pellentesque, sed convallis ante molestie.</p>
            <q>Integer non mollis lorem, ut dignissim augue. Integer at semper erat. In placerat purus ac diam elementum, nec feugiat neque faucibus.</q>
            <p>Fusce tincidunt risus eget magna pretium placerat. Maecenas et tempus mauris. Aliquam est est, sollicitudin a diam eget, maximus pretium lectu. Dolor sit amet consectetur adipisicing elit. Nihil id corrupti neque praesentium blanditiis suscipit nostrum assumenda maxime aperiam quos voluptas voluptates minus.</p>
            <img src="https://dummyimage.com/347x150/d7d2c5/000.jpg" alt="level" />
            <q class="misprint">Eligendi asa voluptates minus sollicitudin a diam eget. Aliquam est est.</q>
            <p>Dolor sit amet consectetur adipisicing elit. Nihil id corrupti neque praesentium blanditiis suscipit nostrum assumenda maxime aperiam quos voluptas voluptates minus, labore nesciunt? Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          </article>
        `
      },
      {
        levelName: 'font-size, font-family, text-align, text-transform',
        instructions: 'The final paragraph appears distinct from the others. To ensure it aligns with the rest of the article, the solution lies in adjusting the <code>font-family</code>, <code>font-size</code>, <code>text-align</code> and <code>text-transform</code> properties.',
        beforeCode: '.misprint {',
        afterCode: '}',
        linesOfCode: 4,
        startHighlightCode: 2,
        error: 'font-size: 25px; font-family: "Turret Road"; text-align: center; text-transform: uppercase;',
        solutions: [['font-size', '16px', '1em', '1rem'], ['font-family', 'Crimson Text', '"Crimson Text"'], ['text-align', 'justify'], ['text-transform', 'none']],
        tipSelector: 'p',
        tipInfo: 'This paragraph\'s characters are <strong>16px</strong> in size, belong to the <strong>"Crimson Text"</strong> family, aligned to the <strong>justify</strong>, and not <strong>uppercased</strong>',
        articleContent: `
          <h2>Insert your article title here</h2>
          <article>
            <img src="https://dummyimage.com/347x100/d7d2c5/000.jpg" alt="level" />
            <p>Alala bala portocala Fusce lobortis ante eget finibus bibendum. Donec mauris purus, volutpat eget eros in, vestibulum ullamcorper ipsum. Sed pretium metus ac odio pellentesque, sed convallis ante molestie. Praesent sagittis venenatis diam, eu condimentum ipsum hendrerit id. Morbi at massa eu dolor convallis feugiat.</p>
            <p>Nihil id corrupti neque praesentium blanditiis suscipit nostrum assumenda maxime aperiam quos voluptas voluptates minus, labore nesciunt? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi asa voluptates minus sollicitudin a diam eget. Sed pretium metus ac odio pellentesque non mollis lorem volutpat eget eros in amet consectetur sollicitudin a diam. Fusce lobortis ante eget finibus bibendum. Donec mauris purus, etc. Aliquam est est, sollicitudin a diam eget dacia est.</p>
            <p>Fusce tincidunt risus eget magna pretium placerat. Maecenas et tempus mauris. Aliquam est est, sollicitudin a diam eget, maximus pretium lectu.</p>
            <p class="misprint">Fusce tincidunt risus eget magna pretium placerat. Maecenas et tempus mauris. Aliquam est est, sollicitudin a diam eget, maximus pretium lectu. Dolor sit amet consectetur adipisicing elit. Nihil id corrupti neque praesentium blanditiis suscipit nostrum assumenda maxime aperiam quos voluptas voluptates minus, labore nesciunt?</p>
          </article>
        `
      },
      {
        levelName: 'line-height, ..., text-transform',
        instructions: 'Wow, the contrast between the first quote and the second one is incredibly substantial. This is definitely not acceptable! Let\'s put into practice the CSS text properties you\'ve already learned: <code>font-family</code>, <code>font-size</code>, <code>font-style</code>, <code>font-weight</code>, <code>color</code>, <code>line-height</code>, <code>text-align</code>, <code>text-decoration</code> and <code>text-transform</code>.',
        beforeCode: '.misprint {',
        afterCode: '}',
        linesOfCode: 9,
        startHighlightCode: 2,
        error: 'font-family: Turret Road, cursive; font-size: 26px; font-style: normal; font-weight: 900; color: red; line-height: 3em; text-align: center; text-decoration: underline; text-transform: lowercase;',
        solutions: [['font-family', 'Playfair Display', '"Playfair Display"'], ['font-size', '16px', '1em', '1rem'], ['font-style', 'italic'], ['font-weight', '300'], ['color', 'black', '#000', '#000000', 'rgb(0,0,0)', 'rgba(0,0,0,1)'], ['line-height', '20px', '1.25em', '1.25rem'], ['text-align', 'left'], ['text-decoration', 'none'], ['text-transform', 'none']],
        tipSelector: 'q',
        tipInfo: 'This quote\'s characters are <strong>16px</strong> in size, belong to the <strong>"Playfair Display"</strong> family, styled in <strong>italic</strong>, have a <strong>300</strong> weight, are colored <strong>black</strong>, have a line height of <strong>20px</strong>, are aligned to the <strong>left</strong>, are <strong>not underlined</strong>, and are <strong>not lowercased</strong>',
        articleContent: `
          <h2>Insert your article title here</h2>
          <article>
            <p>Fusce lobortis ante eget finibus bibendum. Donec mauris purus, volutpat eget eros in, vestibulum ullamcorper. Alala bala portocala Fusce lobortis ante eget finibus bibendum. Donec mauris purus, volutpat eget eros in, vestibulum ullamcorper ipsum. Sed pretium metus ac odio pellentesque, sed convallis ante molestie.</p>
            <q>Integer non mollis lorem, ut dignissim augue. Integer at semper erat. In placerat purus ac diam elementum, nec feugiat neque faucibus.</q>
            <p>Fusce tincidunt risus eget magna pretium placerat. Maecenas et tempus mauris. Aliquam est est, sollicitudin a diam eget, maximus pretium lectu. Dolor sit amet consectetur adipisicing elit. Nihil id corrupti neque praesentium blanditiis suscipit nostrum assumenda maxime aperiam quos voluptas voluptates minus, labore nesciunt? Lorem, ipsum dolor sit amet.</p>
            <q class="misprint">Eligendi asa voluptates minus sollicitudin a diam eget. Aliquam est est.</q>
            <p>Dolor sit amet consectetur adipisicing elit. Nihil id corrupti neque praesentium blanditiis suscipit nostrum assumenda maxime aperiam quos voluptas voluptates minus, labore nesciunt? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi asa voluptates minus sollicitudin a diam eget. Sed pretium metus ac odio pellentesque non mollis, etc.</p>
            <img src="https://dummyimage.com/347x100/d7d2c5/000.jpg" alt="level" />
          </article>
        `
      },
    ]
  },
  {
    chapterName: 'Box Model',
    levels: [
      {
        levelName: 'border',
        instructions: 'Take a look at these images - one has no border, while the other has one. Utilize the <code>border</code> property to rectify the issue.',
        beforeCode: '.misprint {',
        afterCode: '}',
        linesOfCode: 1,
        startHighlightCode: 2,
        error: 'border: none;',
        solutions: [['border', '1px solid black', '1px solid #000', '1px solid #000000', '1px solid rgb(0,0,0)', '1px solid rgba(0,0,0,1)']],
        tipSelector: 'img',
        tipInfo: 'This image has a <strong>1px solid black</strong> border',
        extraStyle: 'img { border: 1px solid black }',
        articleContent: `
          <h2>Insert your article title here</h2>
          <article>
            <p>Fusce lobortis ante eget finibus bibendum. Donec mauris purus, volutpat eget eros in, vestibulum ullamcorper ipsum. Sed pretium metus ac odio pellentesque, sed convallis ante molestie. Praesent sagittis venenatis diam, eu condimentum ipsum hendrerit id. Morbi at massa eu dolor convallis feugiat.</p>
            <img src="https://dummyimage.com/347x100/d7d2c5/000.jpg" alt="level" />
            <p>Integer non mollis lorem, ut dignissim augue et la es integer at semper erat mo en placerat purus ac diam elementum, nec feugiat neque faucibus esta nod. Ppurus ac diam elementum, nec feugiat.</p>
            <p>Fusce tincidunt risus eget magna pretium placerat. Maecenas et tempus mauris. Aliquam est est, sollicitudin a diam eget, maximus pretium lectu. Dolor sit amet consectetur adipisicing elit. Nihil id corrupti neque praesentium blanditiis suscipit nostrum assumenda maxime aperiam quos voluptas voluptates minus, labore nesciunt? Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            <img class="misprint" src="https://dummyimage.com/341x100/d7d2c5/000.jpg" alt="Image" />
            <p>Fusce lobortis ante eget finibus bibendum. Donec mauris purus, volutpat eget eros in, vestibulum ullamcorper ipsum. Sed pretium metus ac odio pellentesque, sed convallis ante molestie. Praesent sagittis venenatis diam, eu condimentum ipsum hendrerit id. Morbi at massa eu dolor convallis feugiat.</p>
            <p>Dolor sit amet consectetur adipisicing elit. Nihil id corrupti neque praesentium blanditiis suscipit elit.Fusce lobortis ante eget finibus bibendum. Donec mauris purus, volutpat eget eros in ete el.</p>
          </article>
        `
      },
    ]
  }

]

export const maxCodeLineNumbers = 13;