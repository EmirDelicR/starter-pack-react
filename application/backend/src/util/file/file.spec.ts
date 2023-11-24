import * as fs from 'fs';
import * as path from 'path';

import {
  createFileStream,
  readFromFile,
  writeToDbFile,
  writeErrorToFile
} from 'src/util/file';

jest.mock('fs');
jest.mock('path');
jest.useFakeTimers();
jest.setSystemTime(new Date(2020, 3, 1));

describe('File utils', () => {
  const onFnMock = jest.fn();
  const writeFnMock = jest.fn();
  const fsCreateWriteStreamSpy = jest.spyOn(fs, 'createWriteStream');
  const fsReadFileSyncSpy = jest.spyOn(fs, 'readFileSync');
  const pathJoinSpy = jest.spyOn(path, 'join');

  beforeEach(() => {
    fsCreateWriteStreamSpy.mockReset().mockImplementation(
      jest.fn().mockImplementation(() => ({
        on: onFnMock,
        write: writeFnMock
      }))
    );
    pathJoinSpy
      .mockReset()
      .mockImplementation(
        (...paths: string[]) =>
          `${paths[paths.length - 2]}/${paths[paths.length - 1]}`
      );
    onFnMock.mockReset();
    writeFnMock.mockReset();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  describe('createFileStream', () => {
    it('should create a stream with specific path', () => {
      const stream = createFileStream('dir', 'file');

      expect(pathJoinSpy).toHaveBeenCalledTimes(1);
      expect(fsCreateWriteStreamSpy).toHaveBeenCalledWith('dir/file', {
        flags: 'a'
      });
      expect(stream).toHaveProperty('on');
      expect(stream).toHaveProperty('write');
    });
  });

  describe('readFromFile', () => {
    it('should return empty array if no data in file', () => {
      const data = readFromFile('dir', 'file');

      expect(pathJoinSpy).toHaveBeenCalledTimes(1);
      expect(fsReadFileSyncSpy).toHaveBeenCalledWith('dir/file');
      expect(data).toEqual([]);
    });

    it('should return data from file', () => {
      fsReadFileSyncSpy.mockReturnValue('{"name":"John"}');
      const data = readFromFile('dir', 'file');

      expect(pathJoinSpy).toHaveBeenCalledTimes(1);
      expect(fsReadFileSyncSpy).toHaveBeenCalledWith('dir/file');
      expect(data).toEqual({ name: 'John' });
    });
  });

  describe('writeToDbFile', () => {
    it('should create a stream with specific path and write data', () => {
      const data = { name: 'John' };
      writeToDbFile(data, 'file');

      expect(pathJoinSpy).toHaveBeenCalledTimes(1);
      expect(fsCreateWriteStreamSpy).toHaveBeenCalledWith('dummy-db/file', {
        flags: 'w'
      });
      expect(onFnMock).toHaveBeenCalledTimes(1);
      expect(writeFnMock).toHaveBeenCalledWith(JSON.stringify(data, null, 2));
    });
  });

  describe('writeErrorToFile', () => {
    it('should create a stream with specific path and write data to logs', () => {
      const error = 'My error';
      writeErrorToFile(error);

      expect(pathJoinSpy).toHaveBeenCalledTimes(1);
      expect(fsCreateWriteStreamSpy).toHaveBeenCalledWith('logs/error.log', {
        flags: 'a'
      });
      expect(onFnMock).toHaveBeenCalledTimes(1);
      expect(writeFnMock).toHaveBeenCalledWith(
        `#Error: <4/1/2020, 12:00:00 AM> ${error}\n`
      );
    });
  });
});
