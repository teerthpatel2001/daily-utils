import { collection, doc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { FormEvent, useLayoutEffect, useState } from 'react'
import Database from '../API/database';
import { ServerLink, shortLink } from '../API/linkshort'
import LinkWrapper from '../components/LinkWrapper';

const Linkshort = () => {
  const router = useRouter();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);


  const short = async(e:FormEvent) => {
    e.preventDefault();

    // @ts-ignore
    const longLink = e.target.longLink.value;

    const validLink = new RegExp('^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$');

    if(!validLink.test(longLink)) return alert('Please Enter Valid URL!')

    setLoading(true);
    const linkId = await shortLink(longLink);
    setLoading(false);
    if (linkId) {
      document.getElementById("new-link-modal")?.click();
      //@ts-ignore
      document.getElementById("new-link-form").reset();
    }
  }

  useLayoutEffect(() => {
    if (!localStorage.getItem("userId")) {
      router.replace("Login");
      return;
    }

    const userId = localStorage.getItem("userId") as string;
    const userRef = doc(Database, "Users", userId);
    onSnapshot(collection(userRef, "Links"), (data) => {
      // @ts-ignore
      setLinks(data.docs.map((item) => {
        
        const link:ServerLink = {
          Long: item.data().Long,
          Short: item.data().Short,
          CreatedAt: item.data().CreatedAt,
          Id: item.id,
        }
        return link;
      }))
      setFetching(false);
    })
  }, [])

  return (
    <>
    <div className="h-full w-full flex flex-col overflow-x-hidden overflow-y-auto ">
      {/* //! Modal Start */}
      <form onSubmit={(e) => short(e)} id="new-link-form">
          <input type="checkbox" id="new-link-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="new-link-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg font-bold">Short New Link</h3>
              {/* //todo: New link content start */}

              <div className="form-control w-full mt-4">
                <label className="input-group ">
                  <span>Long</span>
                  <input
                    type="text"
                    name="longLink"
                    placeholder="https://example.com"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>

              

              <button
                className={`btn btn-primary w-full mt-4 ${
                  loading && "loading"
                }`}
                type="submit"
              >
                short link
              </button>

              {/* //todo: New link content end */}
            </div>
          </div>
        </form>
        {/* //! Modal End */}

        {/* //? Links Header start*/}
        <div className="w-full h-12 justify-between  flex items-center px-2">
          <label
            htmlFor="new-link-modal"
            className="btn btn-primary btn-sm modal-button"
          >
            short new link
          </label>
        </div>
        {/* //? Links Header end*/}

        {/* //todo: Links Body Start */}

        {!fetching ? (
          <div className="h-full w-full overflow-x-hidden mt-5 overflow-y-auto flex flex-wrap items-start lg:justify-start justify-center" >
          {links.map((element:ServerLink) => {
            console.log(element);
            
            return (
              <LinkWrapper {...element} key={element.Id} />
            );
          })}
          </div>
        ) : (
          <div className="h-full w-full grid place-items-center">
            <h1 className="btn btn-ghost select-none loading text-base-content">Fetching Data</h1>
          </div>
        )}

        {/* //todo: Links Body End */}
    </div>
    </>
  )
}

export default Linkshort