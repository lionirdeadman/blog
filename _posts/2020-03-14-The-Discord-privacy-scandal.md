---
title: The Discord privacy scandal
tags: [discord, discool, dis.cool, tracr.co]
layout: post
description: Read more about the privacy scandal that's stealing the information of Discord users every day; how do you protect yourself?
---

# The Discord privacy scandal

Recently, I have reviewed a group of people operating under the name "dis.cool". This group have been stealing the personal data of "100 million users", and selling it to the masses.

## Introduction

I'll start by introducing the group behind "dis.cool". This service is run by rogi and [relative](https://twitter.com/relativexd/). These two are spearheading the organization.
This group was created a while after the release of [Discord](https://discordapp.com), a communication platform for gamers, and everyone else; this service attracts young children, teenagers and everyone else. Then, three years later, the "dis.cool" domain was officially registered. And that's when things took a turn for the worst.

Recently, [a very good friend of mine](https://reddit.com/u/InterestingSometimes) wrote a brief Reddit post about dis.cool. He had contacted the ICO, and many other organizations in a bid to stop this group. We had discovered that dis.cool was not only collecting data without consent, but *selling it for $7 a year*. This is a direct violation of regulations such as the GDPR (Europe), and the CCPA (California). If you'd like to read more about this, I suggest you visit [the Reddit post he wrote](https://www.reddit.com/r/discordapp/comments/f50qil/discool_is_creating_profiles_of_people_who_have/), and [my lengthy comment which explains why this is a danger](https://www.reddit.com/r/discordapp/comments/f50qil/discool_is_creating_profiles_of_people_who_have/fhvzw0n).

We were appalled to find that the information being sold included the connected accounts of users, the server list of users, and information about servers worldwide.

Please remember that *children* use this platform, and the selling of their personal information could potentially put them in grave danger. We, as a community, need to be protecting our aspiring young gamers, and provide a safe environment for them. Right now, that's nonexistent on Discord.

**Also, this is illegal.**

## *How did this happen?*

First off, Discord has had an everlasting problem that goes by the name of selfbots. Selfbots are banned by the Discord ToS. A selfbot is a bot masquerading as a user, and it logs into a user account. These selfbots are then joined into millions of Discord servers, sending data back to dis.cool such as: channel information, information of the users in the server, and all messages sent in channels the selfbot is permitted to read . I have witnessed the selling of these tokens for myself, and it seems to be quite a big business. Discord have put some measures in place (like the prevention of the `Bot {user-token}` `Authentication` header), but it's not enough to stop people like these.

However, I'd like to credit Discord for sending an official letter to [Donuts](https://en.wikipedia.org/wiki/Donuts_(company)), which thankfully got the dis.cool domain shut down. They have since moved to new domains, such as [dsc.cool](https://dsc.cool) and [tracr.co](https://tracr.co). Furthermore, their new Twitter account is [here](https://twitter.com/tracrco).

## *Why not ask them to delete the information?*

That's the thing. When anyone requests to have their personal data *removed* from this service, they are redirected to a meme instructing them to "delete your account". This is not only ethically unacceptable, but the refusal to delete personal data is a violation of the GDPR, and the CCPA. Also, their advice is meaningless, considering that if you *do* follow their instruction, [nothing will be deleted](https://www.reddit.com/r/privacy/comments/fbhv5t/help_us_fight_discool_and_stop_the_scraping/fj5twho).

It's clear to see that these people believe they are [above the laws](https://imgur.com/a/ryf5ycf) set out to protect victimised users.

## Tips on staying safe

### Server owners

### General advice

Currently, you should refrain from posting your server on popular Discord server listing sites. This includes sites such as [top.gg](https://top.gg) and [Discord.Me](https://discord.me); I have good reason to suspect dis.cool are scraping information from these services, because (as quoted by them) there is no ratelimiting system present on some listing services. Following this, you should disable your Server Widget. This allows *anyone* to view information about your server without joining. While some information such as discriminators are anonymized, this is still a security hole.

Also, you should be careful about *where* you post invites. I am unable to gain insight into every service they scrape, but I'd imagine things like server listing subreddits are scraped too. There is some manual work to the scraping too, which makes this a bit harder.

There is no way to limit the information that user accounts can see in your server, aside from limiting the channels they can see. They can still get the name of every channel, and the topics of them too; don't store sensitive information in channel topics.

In addition, a well-established verification system is invaluable in these circumstances. I recommend bots such as [Valkyrja](https://valkyrja.app), which only allows new user accounts to see one channel; the verification process of good bots will definitely slow down selfbots.

Me, and a close friend have been in touch with Discord to limit the information that can be seen by user accounts in your server(s). Stay tuned for updates. Systems such as the [Gateway Intents](https://discordapp.com/developers/docs/topics/gateway#gateway-intents) system have the capability to solve issues such as this, but time will tell.

### Bots

You should also be careful with the bots you add to your server. These bots can ultimately store any and all data you permit them access to, so you should be sure to only allow the permissions required for the bot. As an example, a music bot *definitely* does not need the Administrator permission (looking at you, Rythm).

### Everyone else

If you have any connected accounts (you can access these in the `Connections` section of the settings menu), you should disconnect them immediately. There is the obvious risk that dis.cool have already scraped this information; in that case, there's nothing you can do aside from not connecting any more accounts, and removing the current ones. Over time, their data will grow stale and will essentially be useless.

Moreover, encourage server owners to follow the guidelines above. This is a stepping stone to a more secure system.

## *What can I do?*

You should lodge a complaint with the relevant parties immediately. A good starting point would be to email these companies:

- OVH (Server hosting) (abuste@ovh.net)
- Epik (domain registrar) (abuse@epik.com)
- DDoS-Guard (DDoS protection) (abuse@ddos-guard.net)
- Discord ([request form](https://dis.gd/request))

There are templates for emailing these companies [here](https://gist.github.com/resynth1943/0185f55207dc4d84be99c8d74da9221d).

## References

- [UK GDPR enforcement contact info](https://ico.org.uk/global/contact-us/live-chat/)
- [German GDPR enforcement contact info](https://www.datenschutzkonferenz-online.de/kontakt.html)
- [My post on the r/privacy subreddit](https://www.reddit.com/r/privacy/comments/fbhv5t/help_us_fight_discool_and_stop_the_scraping/)
- [My friend's post on the r/discord subreddit](https://www.reddit.com/r/privacy/comments/f5bbz4/discool_is_creating_profiles_of_discord_users_who/)
- [My friend's post on the r/discordapp subreddit](https://www.reddit.com/r/discordapp/comments/f50qil/discool_is_creating_profiles_of_people_who_have/)
- [The Twitter thread where I first confronted them](https://twitter.com/resynth1943/status/1229012009909411840?s=20)
- [The (unofficial) disdotcool subreddit](https://reddit.com/r/disdotcool)

## *Which articles of the GDPR are they breaching?*

*Probably best to skip this if you're not a lawyer.*

<details>
    <summary><a href="https://gdpr-info.eu/art-6-gdpr/">Chapter 2; Article 6</a></summary>
    <blockquote>
    Processing shall be lawful only if and to the extent that at least one of the following applies: the data subject has given consentto the processing of his or her personal data for one or more specific purposes;
    </blockquote>
</details>

<details>
    <summary><a href="https://gdpr-info.eu/art-8-gdpr/">Chapter 2; Article 8</a></summary>
    <blockquote>
    Where point (a) of Article 6(1) applies, in relation to the offer of information society services directly to a child, the processing of the personal data of a child shall be lawful where the child is at least 16 years old. 2Where the child is below the age of 16 years, such processing shall be lawful only if and to the extent that consent is given or authorised by the holder of parental responsibility over the child.
    </blockquote>
</details>

<details>
    <summary><a href="https://gdpr-info.eu/art-17-gdpr/">Chapter 3; Article 17</a></summary>
    <blockquote>
    The data subject shall have the right to obtain from the controller the erasure of personal data concerning him or her without undue delay and the controller shall have the obligation to erase personal data without undue delay where one of the following grounds applies: the personal data have been unlawfully processed; the data subject withdraws consent on which the processing is based according to point (a) of Article 6(1), or point (a) of Article 9(2), and where there is no other legal ground for the processing;
    </blockquote>
</details>

<details>
    <summary><a href="https://gdpr-info.eu/art-20-gdpr/">Chapter 3; Article 20</a></summary>
    <blockquote>
    The data subject shall have the right to receive the personal data concerning him or her, which he or she has provided to a controller, in a structured, commonly used and machine-readable format
    </blockquote>
</details>

<details>
    <summary><a href="https://gdpr-info.eu/art-21-gdpr/">Chapter 3; Article 21</a></summary>
    <blockquote>
    The data subject shall have the right to object, on grounds relating to his or her particular situation, at any time to processing of personal data concerning him or her which is based on point (e) or (f) of Article 6(1), including profiling based on those provisions.
    </blockquote>
</details>

<details>
    <summary><a href="https://gdpr-info.eu/art-25-gdpr/">Chapter 4; Article 25</a></summary>
    <blockquote>
    Taking into account the state of the art, the cost of implementation and the nature, scope, context and purposes of processing as well as the risks of varying likelihood and severity for rights and freedoms of natural persons posed by the processing, <b>the controller shall, both at the time of the determination of the means for processing and at the time of the processing itself, implement appropriate technical and organisational measures, such as pseudonymisation, which are designed to implement data-protection principles</b>, such as data minimisation, in an effective manner and to integrate the necessary safeguards into the processing in order to meet the requirements of this Regulation and protect the rights of data subjects.
    </blockquote>

    <i>Emphasis added to relevant points.</i>
</details>

## Conclusion

This is very scary for the privacy of Discord users worldwide. I can only hope Discord are able to collaborate with their community to foster brand new, and more secure systems. As an observer, privacy seems to be an afterthought with Discord's API. Thank you for reading this blog post, and I hope I have informed you of the data this group collects and sells, and how you can protect yourself in the meantime.
