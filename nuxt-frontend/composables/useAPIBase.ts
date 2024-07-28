export const useAPIBase = () => {
  // since docker & local API base URLs are different, we need to determine the API base URL based on the environment
  // I had to use import.meta.server to determine if the code is running on the server or client side
  const config = useRuntimeConfig();
  const apiBase =
    import.meta.server && config.public.isDocker
      ? config.public.dockerApiBase
      : config.public.localApiBase;

  return { apiBase };
};
