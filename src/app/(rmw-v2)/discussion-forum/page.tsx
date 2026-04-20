import Awards from '@/allPages/Homepage/Awards'
import About from '@/components/discussionForum/About'
import AskDiscussGrow from '@/components/discussionForum/AskDiscussGrow'
import Banner from '@/components/discussionForum/Banner'
import DiscussionTopics from '@/components/discussionForum/DiscussionTopics'
import NeedExpert from '@/components/discussionForum/NeedExpert'
import StartDiscussion from '@/components/discussionForum/StartDiscussion'
import WhoShouldJoin from '@/components/discussionForum/WhoShouldJoin'
import WhyJoin from '@/components/discussionForum/WhyJoin'
import Section5 from '@/components/influencer-marketing-agency-in-india/Section5'
import React from 'react'
import Section7 from '@/components/home-v3/services/layer-1/Section7'
import BrandImpactSection1 from '@/components/copy/BrandImpactSection1'

export default function page() {
    return (
        <div className='pb-10'>
            <Banner />
            <About />
            <WhyJoin />
            <DiscussionTopics />
            <WhoShouldJoin />
            <AskDiscussGrow />
            <NeedExpert />
            <StartDiscussion />
            <Section5 />
            <Section7/>
            <BrandImpactSection1/>
        </div>
    )
}
