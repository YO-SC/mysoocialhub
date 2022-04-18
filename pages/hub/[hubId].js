import Error from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaEdit, FaReact, FaTrash } from 'react-icons/fa';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import ProfilePicture from '../../components/ProfilePicture';
import { supabase } from '../../utils/supabaseClient';

const user = supabase.auth.user();

export default function Hub(props) {
  if (props.errors.errHub || props.errors.errHubSocialMedia) {
    return <Error statusCode={404} />;
  }
  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const [openModal, setOpenModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [modalConfirmText, setModalConfirmText] = useState('');
  const [ableToEdit, setAbleToEdit] = useState(false);
  const [editing, setEditing] = useState(false);
  // FIXME why userId is on state!?, i dont think its necessary
  const [userId, setUserId] = useState();
  const [avatarEdit, setAvatarEdit] = useState('');
  const [usernameState, setUsernameState] = useState('');
  const [descriptionState, setDescriptionState] = useState('');
  // UGLY try to not store id on state, also refactor hooks in the future
  const [socialMediaId, setSocialMediaId] = useState('');
  const [socialMediaName, setSocialMediaName] = useState('');
  const [socialMediaUrl, setSocialMediaUrl] = useState('');
  // FIXME user arrives null, this contains user info. this happens because the user has not verified their email. Create a verification flow. The user must confirm email and the login. Either force the flow or find a way to do that automatically
  // TODO a better email flow, when a user signs up prompt them to their email, the email then will redirect to the login. have instructions on email, login or signup screen
  const {
    hub: {
      id: hubId,
      owner: { id: hubOwnerId, avatar, username, description },
      social_medias: socialMedias,
      theme: { primaryColor, secondaryColor },
    },
  } = props;

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      if (user.id === hubOwnerId) {
        setAbleToEdit(true);
      }
    }

    if (username) setUsernameState(username);
    if (description) setDescriptionState(description);

    // NOTE consider subscription implementation, they dont seem to be so useful on this app. All "live" changes occur at the moment of a mutation just for the hub owners and their hubs, a page refetch will do since other places on the app dont care about changes in hub (at least for now)

    const profileSubscription = supabase
      .from('hub_owner')
      .on('UPDATE', (payload) => {
        if (payload.new) {
          setUsernameState(payload.new.username);
          setDescriptionState(payload.new.description);
        }
      })
      .subscribe();

    const socialMediaSubscription = supabase
      .from('hub_social_media')
      .on('*', (payload) => {
        if (payload.new) {
          // TODO display new social media on app
          // setUsernameState(payload.new.username);
          // setDescriptionState(payload.new.description);
          console.log(payload.new);
        }
      })
      .subscribe();

    return () => {
      // profileSubscription.unsubscribe();
      supabase.removeSubscription(profileSubscription);
      supabase.removeSubscription(socialMediaSubscription);
    };
  }, []);

  const doAction = (action) => {
    switch (action) {
      case 'create':
        createSocialMedia(hubId, socialMediaName, socialMediaUrl);
        break;

      case 'update':
        updateSocialMedia(socialMediaId, socialMediaName, socialMediaUrl);
        break;

      case 'delete':
        deleteSocialMedia(socialMediaId);
        break;

      default:
        break;
    }
  };

  // CRUD mutations
  const updateProfile = async (userId, username, description) => {
    // TODO have better UX/UI for if returns
    if (!userId) return alert('please provide a userId');
    if (!username) return alert('please put a username');

    // TODO be able to update avatar
    const { data, error } = await supabase
      .from('hub_owner')
      .update({ username, description })
      .eq('id', userId);

    setEditing(!editing);
  };

  const createSocialMedia = async (hubId, name, url) => {
    // TODO have better UX/UI for if returns
    if (!hubId) return alert('please provide a hubId');
    if (!socialMediaName || !socialMediaUrl)
      return alert('please provide a social media name or url');
    if (!socialMediaUrl.includes('https'))
      return alert('a valid and secure url (https) is required');

    const { data, error } = await supabase
      .from('hub_social_media')
      .insert([{ hub: hubId, name, url }]);

    setSocialMediaName('');
    setSocialMediaUrl('');
    setOpenModal(false);

    refreshData();
  };

  const updateSocialMedia = async (socialMediaId, name, url) => {
    // TODO have better UX/UI for if returns
    if (!socialMediaId) return alert('please provide a socialMediaId');
    if (!socialMediaName || !socialMediaUrl)
      return alert('please provide a social media name or url');
    if (!socialMediaUrl.includes('https'))
      return alert('a valid and secure url (https) is required');

    const { data, error } = await supabase
      .from('hub_social_media')
      .update([{ name, url }])
      .eq('id', socialMediaId);

    setSocialMediaName('');
    setSocialMediaUrl('');
    setOpenModal(false);

    refreshData();
  };

  const deleteSocialMedia = async (socialMediaId) => {
    // TODO have better UX/UI for if returns
    if (!socialMediaId) return alert('please provide a socialMediaId');

    const { data, error } = await supabase
      .from('hub_social_media')
      .delete()
      .eq('id', socialMediaId);

    setSocialMediaName('');
    setSocialMediaUrl('');
    setOpenModal(false);

    refreshData();
  };

  return (
    <main className="lg:grid lg:grid-cols-12 h-screen w-full">
      <Head>
        <title>mysocialhub.com - hub</title>
        {/* <meta
          name="description"
          content="Share all your socials with a single link"
        /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* modal */}
      <Modal isOpen={openModal}>
        <h1 className="text-lg font-semibold">Social Media</h1>

        <span className="flex flex-col gap-3">
          {modalAction === 'delete' ? (
            <p>
              This will{' '}
              <span className="font-bold italic">permanently delete</span> the
              social media. Are you sure you want to delete it?
            </p>
          ) : (
            <>
              <Input
                placeholder="Name"
                autoComplete="off"
                value={socialMediaName}
                onChange={(e) => setSocialMediaName(e.target.value)}
              />
              <Input
                placeholder="Url"
                autoComplete="off"
                value={socialMediaUrl}
                onChange={(e) => setSocialMediaUrl(e.target.value)}
              />
            </>
          )}
        </span>

        <span className="flex gap-3 self-end">
          <Button
            text="Close"
            onClick={() => {
              setSocialMediaName('');
              setSocialMediaUrl('');
              setOpenModal(false);
            }}
          />
          <Button
            text={modalConfirmText}
            onClick={() => doAction(modalAction)}
          />
        </span>
      </Modal>

      {/* user info */}
      <section
        className={`${
          primaryColor ? `bg-[${primaryColor}]` : 'bg-primary'
        } col-span-3 flex flex-col justify-center items-center p-4 gap-4`}
      >
        <div className=" w-3/4 self-center">
          <ProfilePicture
            src={avatar ?? '/default_profile_picture.png'}
            layout="responsive"
          />
        </div>

        <div className="h-full w-3/4 self-center break-words">
          {editing ? (
            <div>
              <Input
                className="mb-2"
                placeholder="Username"
                value={usernameState}
                onChange={(e) => setUsernameState(e.target.value)}
              />
              <Input
                placeholder="Description"
                value={descriptionState}
                onChange={(e) => setDescriptionState(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <h1 className="font-bold text-2xl mb-2">
                {usernameState ?? 'Username'}
              </h1>
              <h2 className="text-md">{descriptionState ?? 'Description'}</h2>
            </div>
          )}
        </div>
      </section>

      {/* social medias */}
      {/* // NOTE this section should have a grid that takes into account how many social medias the user has */}
      <section
        className={`${
          secondaryColor ? `bg-[${secondaryColor}]` : 'bg-secondary'
        } 
        col-span-9 px-10 py-4 flex flex-col gap-4 overflow-y-auto`}
      >
        {/* // NOTE think about how to dynamically set / pass the icon component based on DB data. This goes for the icon size and color props too */}
        {socialMedias &&
          socialMedias.map((socialMedia) => {
            const { id, name, url } = socialMedia;

            return (
              <SocialMediaCard
                key={id}
                id={id}
                name={name}
                url={url}
                ableToEdit={ableToEdit}
                setOpenModal={setOpenModal}
                setSocialMediaId={setSocialMediaId}
                setSocialMediaName={setSocialMediaName}
                setSocialMediaUrl={setSocialMediaUrl}
                setModalConfirmText={setModalConfirmText}
                setModalAction={setModalAction}
              />
            );
          })}

        {ableToEdit && (
          <Button
            className="!w-full !p-8 text-lg font-semibold"
            text="Add social media"
            onClick={() => {
              setModalConfirmText('Add');
              setModalAction('create');
              setSocialMediaName('');
              setSocialMediaUrl('');
              setOpenModal(true);
            }}
          />
        )}
      </section>

      {ableToEdit && (
        <span className="absolute right-5 bottom-5 flex gap-3">
          {editing && (
            <Button
              className="outline outline-primary text-lg font-semibold"
              text="Complete Edit"
              onClick={() =>
                updateProfile(userId, usernameState, descriptionState)
              }
            />
          )}

          <Button
            className="outline outline-primary text-lg font-semibold"
            text="Edit"
            onClick={() => setEditing(!editing)}
          />
        </span>
      )}
    </main>
  );
}

// FIXME make both dynamic icons and hub theme work

const SocialMediaCard = ({
  bgColor = 'bg-accent-primary',
  id = null,
  icon = <FaReact size="2.5rem" color="white" />,
  name = 'Social Media Name',
  url = '#',
  ableToEdit = false,
  setOpenModal = null,
  setSocialMediaName = null,
  setSocialMediaUrl = null,
  setModalConfirmText = null,
  setModalAction = null,
  setSocialMediaId = null,
}) => {
  return (
    <div className={`${bgColor} p-8 rounded-xl flex gap-3 justify-between`}>
      <a
        // w-fit h-fit flex-1 <- if need to dynamically adjust size
        className="flex gap-3 items-center w-full"
        href={url}
        target="_blank"
      >
        {/* <span>{icon}</span> */}
        <h3 className="text-lg font-semibold text-white">{name}</h3>
      </a>

      {/* if you want to display the edit button while hovering, use group classes */}
      {ableToEdit && (
        <span className="flex gap-3 items-center">
          <Button
            className="!p-2 rounded-full hover:bg-accent-secondary hover:outline hover:outline-primary hover:cursor-pointer"
            icon={<FaEdit />}
            text={null}
            onClick={() => {
              setModalAction('update');
              setModalConfirmText('Edit');
              setSocialMediaId(id);
              setSocialMediaName(name);
              setSocialMediaUrl(url);
              setOpenModal(true);
            }}
          />

          <Button
            className="!p-2 rounded-full hover:bg-accent-secondary hover:outline hover:outline-primary hover:cursor-pointer"
            icon={<FaTrash />}
            text={null}
            onClick={() => {
              setModalAction('delete');
              setModalConfirmText('Delete');
              setSocialMediaId(id);
              setSocialMediaName(name);
              setSocialMediaUrl(url);
              setOpenModal(true);
            }}
          />
        </span>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const {
    params: { hubId },
  } = context;

  let { data: hub, error: errHub } = await supabase
    .from('hub')
    .select(
      `id,
      owner(
        id,
        avatar,
        username,
        description
      ),
      theme(
        id,
        primaryColor,
        secondaryColor
      )
    `
    )
    .eq('id', hubId)
    .single();

  let { data: hubSocialMedia, error: errHubSocialMedia } = await supabase
    .from('hub_social_media')
    .select(
      `id,
      icon,
      name,
      url
    `
    )
    .eq('hub', hubId);

  // inserting hub social medias to the hub obj
  if (hubSocialMedia && hubSocialMedia.length !== 0) {
    hub['social_medias'] = [...hubSocialMedia];
  }

  return {
    props: {
      hub,
      errors: { errHub, errHubSocialMedia },
    }, // will be passed to the page component as props
  };
}
