import prisma from "./prisma";

export const getSocialMedias = async () => {
  const socialMedias = await prisma.socialMedia.findMany({
    where: {
      imageSocialTypes: {
        every: {
          id: {
            notIn: ['null']
          }
        }
      }
    },
    include: {
      imageSocialTypes: true
    }
  });
  return socialMedias
};