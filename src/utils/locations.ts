export interface LocationModel {
    name: string;
    location: string;
}

export const locations : LocationModel[] = [
    {
        name: 'İstanbul Airport',
        location: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2999.2105145089586!2d28.73985317658971!3d41.26075210383972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409ffff60abc95a9%3A0x380ce02cc824e506!2zxLBzdGFuYnVsIEhhdmFsaW1hbsSx!5e0!3m2!1str!2str!4v1708386321839!5m2!1str!2str" width="400" height="300" loading="lazy"></iframe>'
    },
    {
        name: 'New York City',
        location: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2528001631!2d-74.14448723354508!3d40.69763123329699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c26650d5404947%3A0xec4fb213489f11f0!2sJohn%20F.%20Kennedy%20Uluslararas%C4%B1%20Havaliman%C4%B1!5e0!3m2!1str!2str!4v1708386460842!5m2!1str!2str" width="400" height="300" loading="lazy"></iframe>'
    },
    {
        name: 'Sabiha Gökçen Airport',
        location : '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12061.300688180727!2d29.30739852269287!3d40.908615600530446!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cadbcbf424a153%3A0xacefca4d8098da74!2zU2FiaWhhIEfDtmvDp2VuIEhhdmFsaW1hbsSx!5e0!3m2!1str!2str!4v1708264968667!5m2!1str!2str" width="400" height="300" loading="lazy"></iframe>',
    },
]