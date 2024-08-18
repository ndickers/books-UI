import { useForm } from "react-hook-form";
import {
  useCreateBookMutation,
  useDeleteBookMutation,
  useGetUserBooksQuery,
  useUpdateBookMutation,
} from "../features/api/bookApi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/Auth/AuthSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useState } from "react";

interface TBook {
  title: string;
  author: string;
  year: number;
}
interface TUpdate {
  isUpdate: boolean;
  bookId: null | number;
}
export interface TUser {
  id: number;
  email: string;
  userName: string;
}
export default function Home() {
  const user: TUser | null = useAppSelector((state) => state.login.user)!;

  const [updateBook, { isError: isUpdateError, isLoading: isUpdateLoading }] =
    useUpdateBookMutation();
  const [edit, setEdit] = useState<TUpdate>({
    isUpdate: false,
    bookId: null,
  });
  const {
    data: books,
    error,
    isError,
    isLoading,
  } = useGetUserBooksQuery((user as TUser).id);
  const [deleteBook, { isLoading: deleteIsLoading }] = useDeleteBookMutation();
  const [
    createBook,
    {
      isError: createBookIsError,
      error: createBookError,
      isSuccess: createBookIsSuccess,
      isLoading: createLoading,
    },
  ] = useCreateBookMutation();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<TBook>();

  async function submitBook(data: TBook) {
    data.year = Number(data.year);

    if (edit.isUpdate) {
      try {
        await updateBook({ id: edit.bookId, data });
        setEdit({ isUpdate: false, bookId: null });
        reset();
      } catch (error) {
        console.log(error);
      }
    } else {
      const bookData = {
        ...data,
        user_id: (user as TUser).id,
      };
      try {
        await createBook(bookData);
        reset();
      } catch (error) {
        console.log(error);
      }
    }
  }
  if (isLoading) {
    console.log("....");
  }

  if (isError) {
    console.log({ error });
    dispatch(logout());
  }
  if (createBookIsError) {
    console.log(createBookError);
    toast.error("Failed to add book ");
  }
  if (createBookIsSuccess) {
    toast.success("Book created successfully");
  }

  const bookTr =
    books &&
    books.data.length !== 0 &&
    books.data.map(
      (book: { title: string; author: string; year: number; id: number }) => (
        <tr key={book.id} className="border-2 border-gray-500">
          <td className="td-style">{book.title}</td>
          <td className="td-style">{book.author}</td>
          <td className="td-style">{book.year}</td>
          <td className="td-style">
            <button
              className="btn-style"
              onClick={async () => {
                try {
                  const result = await deleteBook(book.id).unwrap();
                  console.log({ delete: result });
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              delete
            </button>
            <button
              className="btn-style ml-1"
              onClick={() => {
                reset({
                  title: book.title,
                  author: book.author,
                  year: book.year,
                });
                setEdit({ isUpdate: true, bookId: book.id });
              }}
            >
              edit
            </button>
          </td>
        </tr>
      )
    );
  console.log(user);

  return (
    <div className="bg-gray-900 w-full h-[100vh]">
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 dark:bg-neutral-800">
        <nav className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between">
          <a
            className="flex-none text-xl font-semibold dark:text-white focus:outline-none focus:opacity-80"
            href="#"
          >
            Books
          </a>

          <div className="flex items-center justify-between gap-6">
            <h1 className="dark:text-blue-50">{(user as TUser).userName}</h1>
            <button
              onClick={() => {
                dispatch(logout());
              }}
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              logout
            </button>
          </div>
        </nav>
      </header>
      <div className="max-w-[50rem] mx-auto">
        <form
          className=" mx-auto rounded-lg"
          onSubmit={handleSubmit(submitBook)}
          action=""
        >
          <div className="relative">
            <input
              className="input-style rounded-lg my-2"
              type="text"
              placeholder="title"
              {...register("title", { required: "title is required" })}
            />
            {errors.title?.message !== undefined && (
              <div className="absolute  mt-4 inset-y-0 end-0 pointer-events-none pe-3">
                <svg
                  className="size-5 text-red-500"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
              </div>
            )}
            {errors.title?.message !== undefined && (
              <p className="text-xs text-red-600 mt-2" id="email-error">
                {errors.title.message}
              </p>
            )}
          </div>
          <br />
          <div className="relative">
            <input
              className="input-style rounded-lg my-2"
              type="text"
              placeholder="author"
              {...register("author", { required: "author is required" })}
            />
            {errors.author?.message !== undefined && (
              <div className="absolute  mt-4 inset-y-0 end-0 pointer-events-none pe-3">
                <svg
                  className="size-5 text-red-500"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
              </div>
            )}
            {errors.author?.message !== undefined && (
              <p className="text-xs text-red-600 mt-2" id="email-error">
                {errors.author.message}
              </p>
            )}
          </div>
          <br />
          <div className="relative">
            <input
              className="input-style rounded-lg my-2"
              type="number"
              placeholder="publication year"
              {...register("year", { required: "year is required" })}
            />
            {errors.year?.message !== undefined && (
              <div className="absolute  mt-4 inset-y-0 end-0 pointer-events-none pe-3">
                <svg
                  className="size-5 text-red-500"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
              </div>
            )}
            {errors.year?.message !== undefined && (
              <p className="text-xs text-red-600 mt-2" id="email-error">
                {errors.year.message}
              </p>
            )}
          </div>
          <br />
          <button className="bg-blue-400 rounded-md text-white px-4 py-2">
            {edit.isUpdate ? "Update book" : "Add book"}
          </button>
        </form>

        <table className="w-full text-center">
          <thead>
            {isError ? (
              <tr className="border-4 border-gray-600  ">
                <th className="th-style">
                  {error && "data" in error && (error as any).data?.message}
                </th>
              </tr>
            ) : (
              <tr className="border-4 border-gray-600  ">
                <th className="th-style">Title</th>
                <th className="th-style">Author</th>
                <th className="th-style">Year</th>
                <th className="th-style">Actions</th>
              </tr>
            )}
          </thead>
          <tbody>{bookTr}</tbody>
        </table>
      </div>
      {(isLoading || createLoading || isUpdateLoading || deleteIsLoading) && (
        <Spinner />
      )}
    </div>
  );
}
