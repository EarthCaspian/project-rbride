export interface LocationModel {
    name: string;
    location: string;
}

export const locations : LocationModel[] = [
    {
        name: 'İstanbul Airport',
        location: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29992105145089313!2d28.739853176434874!3d4126075210384016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f131!3m3!1m2!1s0x409ffff60abc95a9%3A0x380ce02cc824e506!2zxLBzdGFuYnVsIEhhdmFsaW1hbsSx!5e03m2!1str!2str!4v1707746049020!5m2!1str!2str" width="400" height="300"   loading="lazy"></iframe>'
    },
    {
        name: 'New York City',
        location: '<iframe src="https://www.google.com/maps/embed pb=!1m18!1m12!1m3!1d387274968810857!2d-74.25987562982936!3d469767000553222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f11!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0m2!1sen!2suk!4v1707746057608!5m2!1sen!2suk" width="400" height="300"   loading="lazy></iframe>'
    },
    {
        name: 'Sabiha Gökçen Airport',
        location : '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12061.300688180727!2d29.30739852269287!3d40.908615600530446!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cadbcbf424a153%3A0xacefca4d8098da74!2zU2FiaWhhIEfDtmvDp2VuIEhhdmFsaW1hbsSx!5e0!3m2!1str!2str!4v1708264968667!5m2!1str!2str" width="400" height="300" loading="lazy"></iframe>',
    },
]